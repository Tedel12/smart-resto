import React, { useState } from 'react';
import { D_DARK, D_LIGHT, dFont, THEMES } from '../data/index.js';
import { ClipboardList, BarChart3, Utensils, Palette, Hourglass, ChefHat, CheckCircle, DollarSign, TrendingUp, Receipt, Pencil, Trash2, Sun, Moon, Map, Menu, X, MapPin, Settings, Wallet, CalendarCheck, User, Phone, Users, Calendar, Clock, CreditCard, StickyNote } from 'lucide-react';
import { useMediaQuery } from '../hooks/index.js';


const fmt = (n) => {
  const value = Number(n);
  return (isNaN(value) ? 0 : value).toLocaleString('fr-FR') + ' FCFA';
};

const getContrastColor = (hexColor) => {
  if (!hexColor) return '#fff';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

export default function Dashboard({ menu, setMenu, orders, updateStatus, markPaid, deleteOrder, activeTheme, setActiveTheme, isDarkMode, setIsDarkMode, restaurant, setRestaurant, showToast, customThemeColors, setCustomThemeColors, archivedOrders, tables, tableStatus, setTableStatus, reservations, deleteReservation }) {
  const t = THEMES[activeTheme];
  const D = isDarkMode ? D_DARK : D_LIGHT;
  const accent = customThemeColors[activeTheme] || t.accent || D.gold;
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [tab, setTab] = useState('orders');
  const [editItem, setEditItem] = useState(null);
  const [selectedTable, setSelectedTable] = useState('Tous');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [draftRestaurant, setDraftRestaurant] = useState(() => structuredClone(restaurant));

  React.useEffect(() => {
    setDraftRestaurant(structuredClone(restaurant));
  }, [restaurant]);

  const s = {
    sectionTitle: { color: D.text, fontSize: 20, fontWeight: 800, marginBottom: 20, letterSpacing: -0.3 },
    input: { width: '100%', background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, padding: '10px 14px', color: D.text, fontFamily: dFont, fontSize: 13, outline: 'none' },
  };

  const updateFooter = (key, value) => {
    setDraftRestaurant(prev => ({
        ...prev,
        config: {
            ...prev.config,
            [activeTheme]: {
                ...prev.config[activeTheme],
                footer: { ...prev.config[activeTheme].footer, [key]: value }
            }
        }
    }));
  };

  const updateSocial = (platform, value) => {
    setDraftRestaurant(prev => ({
        ...prev,
        config: {
            ...prev.config,
            [activeTheme]: {
                ...prev.config[activeTheme],
                footer: { ...prev.config[activeTheme].footer, socials: { ...prev.config[activeTheme].footer.socials, [platform]: value } }
            }
        }
    }));
  };

  const saveConfig = () => {
    setRestaurant(structuredClone(draftRestaurant));
    if (showToast) showToast('Configuration enregistrée !');
  };

  const orderTableFilters = ['Tous', ...new Set(orders.map(o => o.table))];
  const filteredOrders = selectedTable === 'Tous' ? orders : orders.filter(o => o.table === selectedTable);

  const pending = orders.filter(o => o.status === 'en attente').length;
  const inProgress = orders.filter(o => o.status === 'en cours').length;
  const ready = orders.filter(o => o.status === 'prêt').length;

  const STATUS_COLORS = {
    'en attente': D.gold,
    'en cours':   D.blue,
    'prêt':       D.green,
    'servi':      D.muted,
  };
  const STATUS_LIST = Object.keys(STATUS_COLORS);
  const allOrders = [...orders, ...archivedOrders];
  const totalRevenue = allOrders.filter(o => o.paid).reduce((s, o) => s + o.total, 0);

  const StatCard = ({ label, value, sub, color, icon: Icon }) => (
    <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: '22px 24px', boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.04)', transition: 'transform .18s, box-shadow .18s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 24px ${isDarkMode ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'}`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.04)'; }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ color: D.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div style={{ color: D.text, fontSize: 26, fontWeight: 800, marginBottom: 4, letterSpacing: -0.5 }}>{value}</div>
      {sub && <div style={{ color: D.muted, fontSize: 12 }}>{sub}</div>}
    </div>
  );

  const [openTableMenu, setOpenTableMenu] = useState(null);

  const reservationForTable = (tableName) => {
    return [...reservations].reverse().find(r => r.tables?.includes(tableName));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: D.bg, fontFamily: t.font || dFont, overflow: 'hidden', position: 'relative' }}>
      {isMobile && (
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ position: 'absolute', top: 20, left: 20, zIndex: 200, background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, padding: 8, color: D.text }}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <div style={{ width: isMobile ? '80%' : 240, background: D.card, borderRight: `1px solid ${D.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0,
        position: isMobile ? 'absolute' : 'static', height: '100%', zIndex: 150, transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform .3s' }}>
        <div style={{ padding: '24px 20px', borderBottom: `1px solid ${D.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isMobile ? 60 : 0 }}>
          <div>
            <div style={{ color: accent, fontSize: 16, fontWeight: 800 }}>{restaurant.name}</div>
            <div style={{ color: D.muted, fontSize: 11 }}>Admin</div>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: D.bg, border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: D.text }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {[
            { id: 'orders', label: 'Commandes', icon: ClipboardList, count: orders.filter(o => o.status !== 'servi').length },
            { id: 'floor',  label: 'Plan Salle', icon: Map },
            { id: 'reservations', label: 'Réservations', icon: CalendarCheck, count: reservations.length },
            { id: 'stats',  label: 'Statistiques', icon: BarChart3 },
            { id: 'menu',   label: 'Menu', icon: Utensils },
            { id: 'themes', label: 'Templates', icon: Palette },
            { id: 'config', label: 'Configurations', icon: Settings },
          ].map(tabItem => (
            <button key={tabItem.id} onClick={() => { setTab(tabItem.id); setIsSidebarOpen(false); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px',
                background: tab === tabItem.id ? `${accent}18` : 'transparent', border: 'none', borderRadius: 10,
                color: tab === tabItem.id ? accent : D.muted, fontFamily: dFont, fontSize: 13, fontWeight: tab === tabItem.id ? 700 : 400,
                cursor: 'pointer', marginBottom: 4, textAlign: 'left', transition: 'all .15s',
                borderLeft: `3px solid ${tab === tabItem.id ? accent : 'transparent'}`, gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><tabItem.icon size={16} /> {tabItem.label}</span>
              {tabItem.count > 0 && <span style={{ background: D.red, color: '#fff', borderRadius: 99, fontSize: 11, fontWeight: 800, padding: '1px 7px' }}>{tabItem.count}</span>}
            </button>
          ))}
        </nav>
        
        <div style={{ padding: '16px 20px', borderTop: `1px solid ${D.border}` }}>
          <div style={{ color: D.muted, fontSize: 11, marginBottom: 4 }}>Thème actif</div>
          <div style={{ color: D.text, fontSize: 13, fontWeight: 600 }}>{THEMES[activeTheme].name}</div>
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
          {tab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={s.sectionTitle}>Commandes en cours</h2>
                <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}
                  style={{ background: D.card, color: D.text, border: `1px solid ${D.border}`, borderRadius: 8, padding: '8px 16px', fontFamily: dFont, fontSize: 13, cursor: 'pointer', outline: 'none' }}>
                  {orderTableFilters.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(150px, 1fr))' : 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                  <StatCard label="En attente" value={pending} icon={Hourglass} color={D.gold} />
                  <StatCard label="En préparation" value={inProgress} icon={ChefHat} color={D.blue} />
                  <StatCard label="Prêt à servir" value={ready} icon={CheckCircle} color={D.green} />
                  <StatCard label="Revenu du jour" value={fmt(totalRevenue)} icon={DollarSign} color={D.purple} />
                </div>
                {filteredOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', color: D.muted, marginTop: 100 }}>
                    <p style={{ fontSize: 18 }}>Aucune commande pour {selectedTable === 'Tous' ? 'le moment' : selectedTable}.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {filteredOrders.map(order => {
                      const statusColor = STATUS_COLORS[order.status] || D.muted;
                      return (
                      <div key={order.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', padding: isMobile ? '14px 16px' : '16px 20px', gap: isMobile ? 12 : 0, borderBottom: `1px solid ${D.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${statusColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Utensils size={17} style={{ color: statusColor }} />
                            </div>
                            <div>
                              <div style={{ color: D.text, fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>{order.table}</div>
                              <div style={{ color: D.muted, fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                                {order.id} {order.timestamp && <><span style={{opacity: 0.5}}>·</span> <Clock size={11} /> {order.timestamp}</>}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end', flexWrap: 'wrap' }}>
                            <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} disabled={order.status === 'servi'}
                              style={{ background: `${statusColor}18`, color: statusColor, border: `1px solid ${statusColor}44`, borderRadius: 99, padding: '6px 14px', fontFamily: dFont, fontSize: 12, fontWeight: 700, cursor: order.status === 'servi' ? 'not-allowed' : 'pointer', outline: 'none', opacity: order.status === 'servi' ? 0.7 : 1 }}>
                              {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button onClick={() => deleteOrder(order.id)} style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: D.muted, flexShrink: 0 }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div style={{ padding: isMobile ? '14px 16px' : '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {order.items.map((it, i) => (
                              <span key={i} style={{ background: D.bg, color: D.text, fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 99, border: `1px solid ${D.border}` }}>
                                <span style={{ color: accent, fontWeight: 800 }}>{it.qty}×</span> {it.name}
                              </span>
                            ))}
                          </div>
                          {order.comment && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: D.gold, fontSize: 12, background: `${D.gold}14`, padding: '8px 12px', borderRadius: 10 }}>
                              <StickyNote size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                              <span>{order.comment}</span>
                            </div>
                          )}
                        </div>

                        <div style={{ padding: isMobile ? '12px 16px' : '14px 20px', background: D.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: D.muted, fontSize: 12, fontWeight: 600 }}>
                            <CreditCard size={13} /> {order.paymentMethod}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <span style={{ color: D.text, fontWeight: 800, fontSize: 17 }}>{fmt(order.total)}</span>
                            {order.paid ? (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: D.green, fontSize: 12, fontWeight: 800, background: `${D.green}18`, padding: '7px 14px', borderRadius: 99 }}>
                                <CheckCircle size={14} /> Encaissé
                              </span>
                            ) : order.status === 'servi' ? (
                              <button onClick={() => markPaid(order.id)} style={{ background: accent, color: isDarkMode ? '#000' : '#fff', border: 'none', padding: '9px 18px', borderRadius: 99, cursor: 'pointer', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 2px 10px ${accent}44` }}>
                                  <Wallet size={14} /> Encaisser
                              </button>
                            ) : (
                              <span style={{ fontSize: 11, color: D.muted, fontStyle: 'italic' }}>En attente de service</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );})}
                  </div>
                )}
            </div>
          )}
          {tab === 'floor' && (
            <div>
                <h2 style={s.sectionTitle}>Plan de Salle</h2>
                <p style={{ color: D.muted, fontSize: 12, marginTop: -12, marginBottom: 20 }}>Cliquez sur une table pour changer son statut manuellement.</p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(120px, 1fr))' : 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
                    {tables.map(tableName => {
                        const status = tableStatus[tableName] || 'libre';
                        const colors = { libre: D.green, occupée: D.gold, 'réservée': D.blue };
                        const c = colors[status] || D.muted;
                        const res = status === 'réservée' ? reservationForTable(tableName) : null;
                        const isOpen = openTableMenu === tableName;
                        return (
                            <div key={tableName} style={{ position: 'relative' }}>
                                <div onClick={() => setOpenTableMenu(isOpen ? null : tableName)}
                                    style={{ background: D.card, padding: 18, borderRadius: 12, textAlign: 'center', border: `2px solid ${c}`, cursor: 'pointer', transition: 'all .15s' }}>
                                    <Utensils style={{ color: c, marginBottom: 8 }} />
                                    <div style={{ color: D.text, fontWeight: 700 }}>{tableName}</div>
                                    <div style={{ color: c, fontSize: 11, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>{status}</div>
                                    {res && <div style={{ color: D.muted, fontSize: 10, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.firstName} {res.lastName}</div>}
                                </div>
                                {isOpen && (
                                    <>
                                        <div onClick={() => setOpenTableMenu(null)} style={{ position: 'fixed', inset: 0, zIndex: 60 }} />
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, background: D.card, border: `1px solid ${D.border}`, borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.25)', zIndex: 61, overflow: 'hidden' }}>
                                            {res && (
                                                <div style={{ padding: '10px 14px', borderBottom: `1px solid ${D.border}`, fontSize: 11, color: D.muted, lineHeight: 1.6 }}>
                                                    <div style={{ color: D.text, fontWeight: 700 }}>{res.firstName} {res.lastName}</div>
                                                    <div>{res.phone}</div>
                                                    <div>{res.date} · {res.time} · {res.guests} pers.</div>
                                                </div>
                                            )}
                                            {['libre', 'occupée', 'réservée'].map(opt => (
                                                <button key={opt} onClick={() => { setTableStatus(tableName, opt); setOpenTableMenu(null); }}
                                                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: status === opt ? `${accent}18` : 'transparent', border: 'none', color: status === opt ? accent : D.text, fontFamily: dFont, fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
          )}
          {tab === 'reservations' && (
            <div>
                <h2 style={s.sectionTitle}>Réservations</h2>
                {reservations.length === 0 ? (
                    <div style={{ textAlign: 'center', color: D.muted, marginTop: 60 }}>
                        <CalendarCheck size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                        <p>Aucune réservation pour le moment.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[...reservations].reverse().map(r => (
                            <div key={r.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: isMobile ? 16 : '18px 22px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 14 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: D.text, fontWeight: 800, fontSize: 15 }}>
                                        <User size={15} style={{ color: accent }} /> {r.firstName} {r.lastName}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, color: D.muted, fontSize: 12 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={12} /> {r.phone}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={12} /> {r.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {r.time}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Users size={12} /> {r.guests} pers.</span>
                                    </div>
                                    {r.address && <div style={{ color: D.muted, fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={12} /> {r.address}</div>}
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                                        {(r.tables || []).map(t => <span key={t} style={{ background: `${accent}18`, color: accent, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>{t}</span>)}
                                    </div>
                                </div>
                                <button onClick={() => deleteReservation(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.red, alignSelf: isMobile ? 'flex-end' : 'flex-start' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          )}
          {tab === 'stats' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                <h2 style={s.sectionTitle}>Statistiques</h2>
                <button onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                        "Date,Table,Items,Total\n" + 
                        orders.map(o => `${new Date(o.id).toLocaleDateString()},${o.table},${o.items.map(i=>i.name).join(';')},${o.total}`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "commandes.csv");
                    document.body.appendChild(link);
                    link.click();
                }} style={{ background: accent, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Exporter CSV</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px,1fr))', gap: 16, marginBottom: 28 }}>
                <StatCard label="Chiffre semaine" value={`${totalRevenue.toLocaleString()} FCFA`} icon={TrendingUp} color={D.green} />
                <StatCard label="Commandes mois" value={orders.length} icon={Receipt} color={D.blue} />
                <StatCard label="Panier moyen" value={fmt(totalRevenue / (orders.length || 1))} icon={Utensils} color={D.purple} />
              </div>
              <h3 style={{...s.sectionTitle, fontSize: 16}}>Ventes par catégories</h3>
              <div style={{background: D.card, border: `1px solid ${D.border}`, padding: '8px 20px', borderRadius: 12}}>
                  {Object.keys(menu).map((cat, i, arr) => {
                      const sales = orders.reduce((acc, o) => acc + o.items.filter(i => menu[cat].find(m => m.id === i.id)).reduce((a, b) => a + b.price * b.qty, 0), 0);
                      return <div key={cat} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${D.border}`}}>
                          <span style={{ color: D.text, fontSize: 14, fontWeight: 600 }}>{cat}</span>
                          <span style={{ color: accent, fontWeight: 800, fontSize: 14 }}>{fmt(sales)}</span>
                      </div>
                  })}
              </div>
            </div>
          )}
          {tab === 'menu' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={s.sectionTitle}>Gestion Menu</h2>
                <button onClick={() => setEditItem('new')} style={{ background: D.gold, color: isDarkMode ? '#000' : '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Ajouter un plat</button>
              </div>

              <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
                <input type="text" placeholder="Nouvelle catégorie" value={newCat} onChange={(e) => setNewCat(e.target.value)} style={s.input} />
                <button onClick={() => {
                  if (newCat && !menu[newCat]) {
                    setMenu(prev => ({ ...prev, [newCat]: [] }));
                    setNewCat('');
                  }
                }} style={{ background: D.blue, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Créer</button>
              </div>

              {Object.entries(menu).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 32 }}>
                  <div style={{ color: accent, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{cat}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(items || []).map(item => (
                      <div key={item.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color .15s' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: D.text, fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                          <div style={{ color: D.muted, fontSize: 12, marginTop: 2 }}>{fmt(item.price)}</div>
                        </div>
                        <button onClick={() => setEditItem(item.id)} style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Pencil size={14} color={D.blue} /></button>
                        <button onClick={() => setMenu(prev => ({ ...prev, [cat]: prev[cat].filter(i => i.id !== item.id) }))} style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Trash2 size={14} color={D.red} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'themes' && (
            <div>
              <h2 style={s.sectionTitle}>Templates</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {Object.values(THEMES).map(th => {
                  const isActive = activeTheme === th.id;
                  return (
                  <div key={th.id} onClick={() => setActiveTheme(th.id)}
                    style={{ background: th.card, border: `2px solid ${isActive ? (customThemeColors[th.id] || th.accent) : D.border}`, borderRadius: 16, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', boxShadow: isActive ? `0 8px 24px ${(customThemeColors[th.id] || th.accent)}33` : 'none', transition: 'all .2s' }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                    {isActive && (
                      <div style={{ position: 'absolute', top: 12, right: 12, background: customThemeColors[th.id] || th.accent, color: getContrastColor(customThemeColors[th.id] || th.accent), width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={14} />
                      </div>
                    )}
                    <div style={{ fontSize: 40 }}>{th.preview.split(' ')[0]}</div>
                    <div>
                      <div style={{ color: th.text, fontWeight: 700 }}>{th.name}</div>
                      <div style={{ color: D.muted, fontSize: 12 }}>{th.sub}</div>
                    </div>
                  </div>
                );})}
              </div>
              
              {[2, 3, 4].includes(activeTheme) && (
                  <div style={{ marginTop: 30 }}>
                    <h3 style={s.sectionTitle}>Couleur du template</h3>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF6'].map(color => (
                            <button key={color} onClick={() => setCustomThemeColors(prev => ({ ...prev, [activeTheme]: color }))}
                                style={{ width: 40, height: 40, borderRadius: '50%', background: color, border: customThemeColors[activeTheme] === color ? '3px solid #fff' : 'none', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
                        ))}
                    </div>
                  </div>
              )}
            </div>
          )}
          {tab === 'config' && (
            <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 300px', gap: 20}}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={s.sectionTitle}>Configurations ({t.name})</h2>
                    <button onClick={saveConfig} style={{ background: accent, color: isDarkMode ? '#000' : '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Enregistrer</button>
                </div>
                {/* Hero Config */}
                <div style={{ background: D.card, padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <h3 style={{...s.sectionTitle, fontSize: 16, marginBottom: 15}}>Section Hero</h3>
                    <label style={{ color: D.muted, fontSize: 12 }}>Titre</label>
                    <input value={draftRestaurant.config[activeTheme]?.hero?.title || ''} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, title: e.target.value}}}}))} style={{...s.input, marginBottom: 10}} />
                    
                    <label style={{ color: D.muted, fontSize: 12 }}>Tagline</label>
                    <input value={draftRestaurant.config[activeTheme]?.hero?.tagline || ''} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, tagline: e.target.value}}}}))} style={{...s.input, marginBottom: 10}} />

                    <label style={{ color: D.muted, fontSize: 12 }}>Description</label>
                    <textarea value={draftRestaurant.config[activeTheme]?.hero?.description || ''} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, description: e.target.value}}}}))} style={{...s.input, marginBottom: 10, minHeight: 60}} />

                    <label style={{ color: D.muted, fontSize: 12 }}>Image</label>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, image: reader.result}}}}));
                            };
                            reader.readAsDataURL(file);
                        }
                    }} style={s.input} />

                    <div style={{display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap'}}>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Couleur d'accent</label>
                            <input type="color" value={draftRestaurant.config[activeTheme]?.hero?.color || '#F5A623'} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, color: e.target.value}}}}))} style={{...s.input, padding: 5, height: 40}} />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Police</label>
                            <select value={draftRestaurant.config[activeTheme]?.hero?.font || 'Sora'} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, font: e.target.value}}}}))} style={{...s.input, height: 40}}>
                                <option>Sora</option>
                                <option>Inter</option>
                                <option>Quicksand</option>
                                <option>Cormorant Garamond</option>
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Taille Titre (px)</label>
                            <input type="number" value={draftRestaurant.config[activeTheme]?.hero?.fontSize || 88} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], hero: {...prev.config[activeTheme].hero, fontSize: e.target.value}}}}))} style={{...s.input, height: 40}} />
                        </div>
                    </div>
                </div>
                {/* CTA Config */}
                <div style={{ background: D.card, padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <h3 style={{...s.sectionTitle, fontSize: 16, marginBottom: 15}}>Section Call to Action</h3>
                    <label style={{ color: D.muted, fontSize: 12 }}>Titre CTA</label>
                    <input value={draftRestaurant.config[activeTheme]?.cta?.title || ''} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], cta: {...prev.config[activeTheme].cta, title: e.target.value}}}}))} style={{...s.input, marginBottom: 10}} />
                    
                    <label style={{ color: D.muted, fontSize: 12 }}>Texte bouton</label>
                    <input value={draftRestaurant.config[activeTheme]?.cta?.buttonText || ''} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], cta: {...prev.config[activeTheme].cta, buttonText: e.target.value}}}}))} style={{...s.input, marginBottom: 10}} />
                </div>
                {/* Nav Layout Config */}
                <div style={{ background: D.card, padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <h3 style={{...s.sectionTitle, fontSize: 16, marginBottom: 15}}>Disposition Navigation</h3>
                    <select value={draftRestaurant.config[activeTheme]?.navLayout || 1} onChange={e => setDraftRestaurant(prev => ({...prev, config: {...prev.config, [activeTheme]: {...prev.config[activeTheme], navLayout: Number(e.target.value)}}}))} style={{...s.input, height: 40}}>
                        <option value={1}>Style 1 (Standard)</option>
                        <option value={2}>Style 2 (Logo Centré)</option>
                        <option value={3}>Style 3 (Sidebar)</option>
                    </select>
                </div>
                {/* Footer Config */}
                <div style={{ background: D.card, padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <h3 style={{...s.sectionTitle, fontSize: 16, marginBottom: 15}}>Footer & Logo</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                        <div>
                            <label style={{ color: D.muted, fontSize: 12, marginBottom: 8, display: 'block' }}>Logo</label>
                            <input type="file" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDraftRestaurant(prev => ({...prev, logo: reader.result}));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} style={{...s.input, marginBottom: 10}} />

                            <label style={{ color: D.muted, fontSize: 12 }}>Nom du restaurant</label>
                            <input value={draftRestaurant.name} onChange={e => setDraftRestaurant(prev => ({...prev, name: e.target.value}))} style={{...s.input, marginBottom: 10}} />

                            <label style={{ color: D.muted, fontSize: 12 }}>Adresse</label>
                            <input value={draftRestaurant.config[activeTheme]?.footer?.address || ''} onChange={e => updateFooter('address', e.target.value)} style={{...s.input, marginBottom: 10}} />
                            
                            <label style={{ color: D.muted, fontSize: 12 }}>Téléphone</label>
                            <input value={draftRestaurant.config[activeTheme]?.footer?.phone || ''} onChange={e => updateFooter('phone', e.target.value)} style={{...s.input, marginBottom: 10}} />
                            
                            <label style={{ color: D.muted, fontSize: 12 }}>Email</label>
                            <input value={draftRestaurant.config[activeTheme]?.footer?.email || ''} onChange={e => updateFooter('email', e.target.value)} style={{...s.input}} />
                        </div>
                        <div>
                            <label style={{ color: D.muted, fontSize: 12 }}>Facebook</label>
                            <input value={draftRestaurant.config[activeTheme]?.footer?.socials?.facebook || ''} onChange={e => updateSocial('facebook', e.target.value)} style={{...s.input, marginBottom: 10}} />
                            
                            <label style={{ color: D.muted, fontSize: 12 }}>Instagram</label>
                            <input value={draftRestaurant.config[activeTheme]?.footer?.socials?.instagram || ''} onChange={e => updateSocial('instagram', e.target.value)} style={{...s.input, marginBottom: 10}} />
                            
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginTop: 10 }}>
                                <input type="checkbox" checked={draftRestaurant.config[activeTheme]?.footer?.newsletterEnabled || false} onChange={e => updateFooter('newsletterEnabled', e.target.checked)} />
                                <span style={{ color: D.text }}>Activer Newsletter</span>
                            </label>
                        </div>
                    </div>
                </div>
              </div>
              <div style={{ position: 'sticky', top: 20 }}>
                <h3 style={{...s.sectionTitle, fontSize: 14}}>Aperçu</h3>
                <div style={{ background: D.card, border: `1px solid ${D.border}`, padding: 20, borderRadius: 12 }}>
                    <div style={{color: D.muted, fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase'}}>Hero</div>
                    <div style={{ height: 150, background: '#000', borderRadius: 8, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 10 }}>
                        <div style={{ position: 'absolute', inset: 0, background: `url(${draftRestaurant.config[activeTheme]?.hero?.image || ''}) center/cover`, filter: 'brightness(.4)' }} />
                        <div style={{position: 'relative', color: '#fff'}}>
                            <h1 style={{fontSize: 16, margin: 0, color: draftRestaurant.config[activeTheme]?.hero?.color || accent}}>{draftRestaurant.config[activeTheme]?.hero?.title || 'Titre'}</h1>
                            <p style={{fontSize: 10, margin: '4px 0'}}>{draftRestaurant.config[activeTheme]?.hero?.tagline || 'Tagline'}</p>
                        </div>
                    </div>
                    <div style={{color: D.muted, fontSize: 11, fontWeight: 700, marginTop: 20, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase'}}>CTA</div>
                    <div style={{ background: accent, color: getContrastColor(accent), padding: 15, borderRadius: 8, fontSize: 10, textAlign: 'center' }}>
                        <div style={{fontWeight: 700, marginBottom: 5}}>{draftRestaurant.config[activeTheme]?.cta?.title || 'Titre CTA'}</div>
                        <div style={{background: 'rgba(0,0,0,0.2)', padding: '5px 10px', borderRadius: 4, display: 'inline-block'}}>{draftRestaurant.config[activeTheme]?.cta?.buttonText || 'Bouton'}</div>
                    </div>
                    <div style={{color: D.muted, fontSize: 11, fontWeight: 700, marginTop: 20, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase'}}>Footer</div>
                    <div style={{ background: '#1c1c1c', color: '#fff', padding: 15, borderRadius: 8, fontSize: 10, textAlign: 'center' }}>
                        {draftRestaurant.logo && <img src={draftRestaurant.logo} style={{height: 30, marginBottom: 5}} alt="Logo" />}
                        <div style={{fontWeight: 700, marginBottom: 2}}>{draftRestaurant.name}</div>
                        <div style={{opacity: 0.7}}>{draftRestaurant.config[activeTheme]?.footer?.address || ''}</div>
                        <div style={{opacity: 0.7}}>{draftRestaurant.config[activeTheme]?.footer?.phone || ''}</div>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {editItem && (() => {
        let editCategory = '';
        let itemToEdit = null;
        
        if (editItem === 'new') {
            editCategory = Object.keys(menu)[0];
            itemToEdit = { name: '', price: 0, desc: '', img: '', hot: false, badge: null };
        } else {
            for (const [cat, items] of Object.entries(menu)) {
              const found = items.find(i => i.id === editItem);
              if (found) {
                editCategory = cat;
                itemToEdit = found;
                break;
              }
            }
        }
        if (!itemToEdit) return null;

        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div onClick={() => setEditItem(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
            <div style={{ position: 'relative', background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, width: '100%', maxWidth: 500, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.5)', fontFamily: dFont }}>
              <h3 style={{ color: D.text, fontSize: 18, fontWeight: 800, borderBottom: `1px solid ${D.border}`, paddingBottom: 12 }}>{editItem === 'new' ? 'Ajouter un plat' : 'Modifier l\'article'}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Catégorie</label>
                <select defaultValue={editCategory} id="edit-cat" style={s.input}>
                    {Object.keys(menu).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Nom du plat</label>
                <input type="text" defaultValue={itemToEdit.name} id="edit-name" style={s.input} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Prix (FCFA)</label>
                <input type="number" defaultValue={itemToEdit.price} id="edit-price" style={s.input} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Description</label>
                <textarea defaultValue={itemToEdit.desc} id="edit-desc" style={{ ...s.input, minHeight: 80, resize: 'vertical' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Image</label>
                <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            document.getElementById('edit-img').value = reader.result;
                        };
                        reader.readAsDataURL(file);
                    }
                }} style={s.input} />
                <input type="text" defaultValue={itemToEdit.img} id="edit-img" style={{...s.input, display: 'none'}} />
              </div>

              <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: D.text, fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={itemToEdit.hot} id="edit-hot" /> Épicé
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: D.text, fontSize: 13 }}>
                  Badge:
                  <select defaultValue={itemToEdit.badge || ''} id="edit-badge" style={{ ...s.input, width: 'auto', padding: '4px 8px' }}>
                    <option value="">Aucun</option>
                    <option value="populaire">Populaire</option>
                    <option value="chef">Chef</option>
                    <option value="maison">Maison</option>
                    <option value="léger">Léger</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16, borderTop: `1px solid ${D.border}`, paddingTop: 16 }}>
                <button onClick={() => setEditItem(null)} style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, padding: '10px 20px', color: D.text, cursor: 'pointer', fontFamily: dFont, fontSize: 13, fontWeight: 600 }}>Annuler</button>
                <button onClick={() => {
                  const cat = document.getElementById('edit-cat').value;
                  const name = document.getElementById('edit-name').value;
                  const price = Number(document.getElementById('edit-price').value);
                  const desc = document.getElementById('edit-desc').value;
                  const img = document.getElementById('edit-img').value;
                  const hot = document.getElementById('edit-hot').checked;
                  const badgeVal = document.getElementById('edit-badge').value;
                  const badge = badgeVal === '' ? null : badgeVal;
                  
                  const newItem = { ...itemToEdit, id: editItem === 'new' ? Date.now() : itemToEdit.id, name, price, desc, img, hot, badge };
                  
                  if (editItem === 'new') {
                    setMenu(prev => ({
                        ...prev,
                        [cat]: [...prev[cat], newItem]
                    }));
                  } else {
                    setMenu(prev => {
                        const next = { ...prev };
                        if (editCategory !== cat) {
                            next[editCategory] = next[editCategory].filter(i => i.id !== itemToEdit.id);
                            next[cat] = [...next[cat], newItem];
                        } else {
                            next[cat] = next[cat].map(i => i.id === editItem ? newItem : i);
                        }
                        return next;
                    });
                  }
                  setEditItem(null);
                }} style={{ background: accent, border: 'none', borderRadius: 8, padding: '10px 20px', color: isDarkMode ? '#000' : '#fff', cursor: 'pointer', fontFamily: dFont, fontSize: 13, fontWeight: 800 }}>Enregistrer</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
