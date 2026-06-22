import React, { useState, useEffect } from 'react';
import { useCart, useOrders } from './hooks/index.js';
import LandingPage from './components/LandingPage.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import { D, dFont, RESTAURANT, THEMES, MENU } from './data/index.js';
import { Trees, Globe, Settings, ShoppingCart, PartyPopper, Check } from 'lucide-react';

export default function App() {
  const cart = useCart();
  const { orders, updateStatus, addOrder, deleteOrder } = useOrders();
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem('sr_view') || 'landing';
    } catch (e) {
      return 'landing';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sr_view', view);
    } catch (e) {
      console.error(e);
    }
  }, [view]);
  const [showCart, setShowCart] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('sr_theme');
      return saved ? Number(saved) : 5;
    } catch (e) {
      return 5;
    }
  });
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('sr_menu');
      return saved ? JSON.parse(saved) : MENU;
    } catch (e) {
      return MENU;
    }
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('sr_theme', activeTheme);
    } catch (e) {
      console.error(e);
    }
  }, [activeTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('sr_menu', JSON.stringify(menu));
    } catch (e) {
      console.error(e);
    }
  }, [menu]);

  const currentTheme = THEMES[activeTheme];

  const getAccentBtnText = (themeId) => {
    if (themeId === 2 || themeId === 3 || themeId === 5) return '#fff';
    return '#000';
  };

  const showToast = (msg, color = D.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2400);
  };

  const handleAdd = (item) => {
    cart.add(item);
    showToast(<><Check size={16} /> {item.name} ajouté</>, D.green);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    addOrder({ table: RESTAURANT.table, items: cart.items });
    cart.clear();
    setShowCart(false);
    showToast(<><PartyPopper size={16} /> Commande envoyée en cuisine !</>, D.gold);
  };

  const isLightTheme = currentTheme.bg === '#FFFFFF' || currentTheme.bg === '#FAF8F3' || currentTheme.bg === '#FFFBF5';
  const navBg = isLightTheme ? 'rgba(250, 248, 243, 0.94)' : 'rgba(10, 12, 15, 0.94)';
  const navBorder = currentTheme.border;
  const navText = currentTheme.text;
  const navLogoColor = currentTheme.accent;

  return (
    <div style={{ fontFamily: currentTheme.font }}>

      {/* ── Top Nav ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
        background: navBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${navBorder}`, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px', height: 56, transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: navLogoColor, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trees size={20} /> {RESTAURANT.name}
          </span>
          <div style={{ width: 1, height: 20, background: navBorder }} />
          <button onClick={() => setView('landing')}
            style={{ background: view === 'landing' ? `${currentTheme.accent}22` : 'none', color: view === 'landing' ? currentTheme.accent : currentTheme.muted,
              border: 'none', padding: '6px 14px', borderRadius: 8, fontFamily: currentTheme.font, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
            <Globe size={16} /> Vitrine
          </button>
          <button onClick={() => setView('dashboard')}
            style={{ background: view === 'dashboard' ? `${currentTheme.accent}22` : 'none', color: view === 'dashboard' ? currentTheme.accent : currentTheme.muted,
              border: 'none', padding: '6px 14px', borderRadius: 8, fontFamily: currentTheme.font, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
            <Settings size={16} /> Dashboard
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: currentTheme.muted, fontSize: 12 }}>{RESTAURANT.table}</span>
          {view === 'landing' && (
            <button onClick={() => setShowCart(true)} style={{ position: 'relative', background: currentTheme.accent, border: 'none',
              color: getAccentBtnText(activeTheme), padding: '8px 18px', borderRadius: 99, fontFamily: currentTheme.font, fontSize: 13, fontWeight: 800, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, transition: 'transform .15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <ShoppingCart size={16} /> Panier
              {cart.count > 0 && (
                <span style={{ background: currentTheme.danger || '#FF4757', color: '#fff', borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                  {cart.count}
                </span>
              )}
            </button>
          )}
        </div>
      </nav>

      {/* ── Content (with top padding for nav) ── */}
      <div style={{ paddingTop: 56 }}>
        {view === 'landing' ? (
          <LandingPage menu={menu} cart={cart} onAdd={handleAdd} activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
        ) : (
          <Dashboard menu={menu} setMenu={setMenu} orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} activeTheme={activeTheme} setActiveTheme={setActiveTheme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        )}
      </div>

      {/* ── Cart Sidebar ── */}
      {showCart && (
        <CartSidebar cart={cart} onClose={() => setShowCart(false)} onCheckout={handleCheckout} />
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
