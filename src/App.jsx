import React, { useState, useEffect } from 'react';
import { useCart, useOrders, useReservations, useTableStatus, useMediaQuery, useMenu, useRestaurant } from './hooks/index.js';
import LandingPage from './components/LandingPage.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import { D, dFont, RESTAURANT, THEMES, MENU, TABLES } from './data/index.js';
import { readStorage, writeStorage } from './lib/storage.js';
import { Trees, Globe, Settings, ShoppingCart, Check, CalendarCheck, ChefHat } from 'lucide-react';
import ReservationModal from './components/ReservationModal.jsx';
import AlertModal from './components/AlertModal.jsx';

const Nav = ({ restaurant, accent, accentText, currentTheme, navBg, navBorder, view, setView, setShowCart, cart, activeTheme, isMobile }) => {
    const rawLayout = restaurant.config[activeTheme]?.navLayout || 1;
    const layout = isMobile && rawLayout === 3 ? 1 : rawLayout;

    const navStyle = (centered = false) => ({
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
        background: navBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${navBorder}`, display: 'flex', alignItems: 'center',
        justifyContent: centered ? 'center' : 'space-between', padding: isMobile ? '0 10px' : '0 16px', height: 56, transition: 'all 0.3s', gap: 8
    });

    const NavContent = () => (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                {restaurant.logo ? (
                    <img src={restaurant.logo} alt="Logo" style={{ height: 30, width: 30, objectFit: 'contain', borderRadius: 4, flexShrink: 0 }} />
                ) : (
                    <Trees size={18} style={{ color: accent, flexShrink: 0 }} />
                )}
                <span style={{ color: accent, fontWeight: 800, fontSize: isMobile ? 14 : 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: isMobile ? 100 : 260 }}>{restaurant.name}</span>
            </div>
            {layout !== 2 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 2 : 8, flexShrink: 0 }}>
                    <button onClick={() => setView('landing')} title="Vitrine" style={{ background: view === 'landing' ? `${accent}22` : 'none', color: view === 'landing' ? accent : currentTheme.muted, border: 'none', padding: isMobile ? '6px' : '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Globe size={14} /> {!isMobile && 'Vitrine'}
                    </button>
                    <button onClick={() => setView('dashboard')} title="Admin" style={{ background: view === 'dashboard' ? `${accent}22` : 'none', color: view === 'dashboard' ? accent : currentTheme.muted, border: 'none', padding: isMobile ? '6px' : '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Settings size={14} /> {!isMobile && 'Admin'}
                    </button>
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12, flexShrink: 0 }}>
                {!isMobile && <span style={{ color: currentTheme.muted, fontSize: 12, whiteSpace: 'nowrap' }}>{restaurant.table}</span>}
                {view === 'landing' && (
                    <button onClick={() => setShowCart(true)} style={{ position: 'relative', background: accent, border: 'none', color: accentText, padding: isMobile ? '8px 12px' : '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 8 }}>
                    <ShoppingCart size={16} /> {!isMobile && 'Panier'}
                    {cart.count > 0 && <span style={{ background: currentTheme.danger || '#FF4757', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, position: isMobile ? 'absolute' : 'static', top: isMobile ? -6 : 'auto', right: isMobile ? -6 : 'auto' }}>{cart.count}</span>}
                    </button>
                )}
            </div>
        </>
    );

    if (layout === 3) return <nav style={{...navStyle(), flexDirection: 'column', alignItems: 'stretch', height: '100vh', width: 200, left: 0, right: 'auto', padding: '20px 16px', gap: 20}}><NavContent /></nav>;
    return <nav style={navStyle(layout === 2)}><NavContent /></nav>;
};

export default function App() {
  const cart = useCart();
  const { orders, archivedOrders, updateStatus, addOrder, deleteOrder, markPaid } = useOrders();
  const { reservations, addReservation, deleteReservation } = useReservations();
  const { tableStatus, setTableStatus } = useTableStatus(TABLES);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [view, setView] = useState(() => readStorage('sr_view', 'landing'));

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    writeStorage('sr_view', view);
  }, [view]);
  const [showCart, setShowCart] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => readStorage('sr_theme', 5));
  const [showRes, setShowRes] = useState(false);
  const [alertBox, setAlertBox] = useState(null);

  const handleReserve = (data) => {
   addReservation(data);
   data.tables.forEach(table => setTableStatus(table, 'réservée'));
   setShowRes(false);
   setAlertBox({
     icon: CalendarCheck,
     title: 'Réservation confirmée !',
     message: `Merci ${data.firstName} ${data.lastName}, votre table (${data.tables.join(', ')}) est réservée pour le ${data.date} à ${data.time}. Nous avons hâte de vous accueillir !`,
     buttonText: 'Parfait !',
   });
  };
  const [menu, setMenu] = useMenu(MENU);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [restaurant, setRestaurant] = useRestaurant(RESTAURANT);

  const [customThemeColors, setCustomThemeColors] = useState(() => readStorage('sr_custom_colors', {}));

  useEffect(() => {
    writeStorage('sr_custom_colors', customThemeColors);
  }, [customThemeColors]);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    writeStorage('sr_theme', activeTheme);
  }, [activeTheme]);

  const getContrastColor = (hexColor) => {
    if (!hexColor) return '#fff';
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000' : '#fff';
  };

  const currentTheme = THEMES[activeTheme];
  const accent = customThemeColors[activeTheme] || currentTheme.accent;
  const accentText = getContrastColor(accent);

  const showToast = (msg, color = D.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2400);
  };

  const handleAdd = (item) => {
    cart.add(item);
    showToast(<><Check size={16} /> {item.name} ajouté</>, D.green);
  };

  const handleCheckout = (comment, paymentMethod) => {
    if (cart.items.length === 0) return;
    addOrder({ table: restaurant.table, items: cart.items, comment, paymentMethod });
    cart.clear();
    setShowCart(false);
    setAlertBox({
      icon: ChefHat,
      title: 'Commande envoyée !',
      message: `Votre commande a bien été transmise en cuisine pour la ${restaurant.table}. Elle sera prête très bientôt.`,
      color: accent,
      buttonText: 'Miam, merci !',
    });
  };

  const isLightTheme = currentTheme.bg === '#FFFFFF' || currentTheme.bg === '#FAF8F3' || currentTheme.bg === '#FFFBF5';
  const navBg = isLightTheme ? 'rgba(250, 248, 243, 0.94)' : 'rgba(10, 12, 15, 0.94)';
  const navBorder = currentTheme.border;

  return (
    <div style={{ fontFamily: currentTheme.font }}>

      <Nav restaurant={restaurant} accent={accent} accentText={accentText} currentTheme={currentTheme} navBg={navBg} navBorder={navBorder} view={view} setView={setView} setShowCart={setShowCart} cart={cart} activeTheme={activeTheme} isMobile={isMobile} />

      <div style={{ paddingTop: (!isMobile && restaurant.config[activeTheme]?.navLayout === 3) ? 0 : 56, paddingLeft: (!isMobile && restaurant.config[activeTheme]?.navLayout === 3) ? 200 : 0 }}>
        {view === 'landing' ? (
          <LandingPage menu={menu} cart={cart} onAdd={handleAdd} activeTheme={activeTheme} setActiveTheme={setActiveTheme} restaurant={restaurant} customThemeColors={customThemeColors} setSelectedItem={setSelectedItem} setView={setView} onReserve={() => setShowRes(true)} isMobile={isMobile} />
        ) : view === 'item-detail' ? (
          <ItemDetail item={selectedItem} theme={{ ...currentTheme, accent: accent }} onAdd={handleAdd} onClose={() => setView('landing')} />
        ) : (
          <Dashboard menu={menu} setMenu={setMenu} orders={orders} archivedOrders={archivedOrders} updateStatus={updateStatus} markPaid={markPaid} deleteOrder={deleteOrder} activeTheme={activeTheme} setActiveTheme={setActiveTheme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} restaurant={restaurant} setRestaurant={setRestaurant} showToast={showToast} customThemeColors={customThemeColors} setCustomThemeColors={setCustomThemeColors} tables={TABLES} tableStatus={tableStatus} setTableStatus={setTableStatus} reservations={reservations} deleteReservation={deleteReservation} />
        )}
      </div>

      {showRes && <ReservationModal onClose={() => setShowRes(false)} onSubmit={handleReserve} tables={TABLES} tableStatus={tableStatus} accent={accent} font={currentTheme.bodyFont || currentTheme.font} />}

      {alertBox && (
        <AlertModal
          icon={alertBox.icon}
          title={alertBox.title}
          message={alertBox.message}
          color={alertBox.color || D.green}
          buttonText={alertBox.buttonText}
          font={currentTheme.bodyFont || currentTheme.font}
          onClose={() => setAlertBox(null)}
        />
      )}

      {/* ── Cart Sidebar ── */}
      {showCart && (
        <CartSidebar cart={cart} onClose={() => setShowCart(false)} onCheckout={handleCheckout} theme={currentTheme} activeTheme={activeTheme} customThemeColors={customThemeColors} />
      )}

      {/* ── Toast notification ── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999,
          background: toast.color, color: toast.color === D.gold ? '#000' : '#fff',
          padding: '12px 22px', borderRadius: 99, fontWeight: 700, fontSize: 14, fontFamily: dFont,
          boxShadow: `0 8px 30px ${toast.color}66`, animation: 'fadeUp .3s ease' }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
