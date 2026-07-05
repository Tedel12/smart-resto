import React, { useState } from 'react';
import { D_DARK, D_LIGHT, dFont, THEMES, RESTAURANT } from '../data/index.js';
import { ClipboardList, BarChart3, Utensils, Palette, Hourglass, ChefHat, CheckCircle, DollarSign, TrendingUp, Receipt, Pencil, Trash2, Sun, Moon, Map, Menu, X, MapPin } from 'lucide-react';
import { useMediaQuery } from '../hooks/index.js';

const fmt = (n) => {
  const value = Number(n);
  return (isNaN(value) ? 0 : value).toLocaleString('fr-FR') + ' FCFA';
};

export default function Dashboard({ menu, setMenu, orders, updateStatus, deleteOrder, activeTheme, setActiveTheme, isDarkMode, setIsDarkMode, restaurant, setRestaurant, showToast, customThemeColors, setCustomThemeColors }) {
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
    sectionTitle: { color: D.text, fontSize: 18, fontWeight: 700, marginBottom: 20 },
    input: { width: '100%', background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, padding: '10px 14px', color: D.text, fontFamily: dFont, fontSize: 13, outline: 'none' },
  };

  const updateFooter = (key, value) => {
    setDraftRestaurant(prev => ({
        ...prev,
        footer: { ...prev.footer, [key]: value }
    }));
  };

  const updateSocial = (platform, value) => {
    setDraftRestaurant(prev => ({
        ...prev,
        footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } }
    }));
  };

  const saveConfig = () => {
    setRestaurant(structuredClone(draftRestaurant));
    if (showToast) showToast('Configuration enregistrée !');
  };

  const tables = ['Tous', ...new Set(orders.map(o => o.table))];
  const filteredOrders = selectedTable === 'Tous' ? orders : orders.filter(o => o.table === selectedTable);

  const totalRevenue = orders.filter(o => o.status === 'servi').reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === 'en attente').length;
  const inProgress = orders.filter(o => o.status === 'en cours').length;
  const ready = orders.filter(o => o.status === 'prêt').length;

  const STATUS_COLORS = {
    'en attente': D.gold,
    'en cours':   D.blue,
    'prêt':       D.green,
    'servi':      D.muted,
  };
  const STATUS_LIST = ['en attente', 'en cours', 'prêt', 'servi'];

  const StatCard = ({ label, value, sub, color, icon: Icon }) => (
    <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: '22px 24px', borderTop: `3px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ color: D.muted, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
        <Icon size={22} style={{ color }} />
      </div>
      <div style={{ color: D.text, fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ color: D.muted, fontSize: 12 }}>{sub}</div>}
    </div>
  );

  const getTableStatus = (tableName) => {
    const tableOrders = orders.filter(o => o.table === tableName && o.status !== 'servi');
    if (tableOrders.length === 0) return 'libre';
    if (tableOrders.some(o => o.status === 'en attente' || o.status === 'en cours')) return 'occupée';     
    return 'prêt';
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
            <div style={{ color: accent, fontSize: 16, fontWeight: 800 }}>{RESTAURANT.name}</div>
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
            { id: 'stats',  label: 'Statistiques', icon: BarChart3 },
            { id: 'menu',   label: 'Menu', icon: Utensils },
            { id: 'themes', label: 'Templates', icon: Palette },
            { id: 'hero',   label: 'Configuration Hero', icon: ChefHat },
            { id: 'footer', label: 'Configuration Footer', icon: MapPin },
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
                  {tables.map(t => <option key={t} value={t}>{t}</option>)}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filteredOrders.map(order => (
                      <div key={order.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: isMobile ? '16px' : '18px 22px', borderLeft: `4px solid ${STATUS_COLORS[order.status] || D.muted}` }}>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', marginBottom: 12, gap: isMobile ? 12 : 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ color: D.text, fontWeight: 800, fontSize: 15 }}>{order.id}</span>
                            <span style={{ background: D.bg, color: D.muted, fontSize: 12, padding: '3px 10px', borderRadius: 99 }}>{order.table}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                            <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} disabled={order.status === 'servi'}
                              style={{ background: `${STATUS_COLORS[order.status]}22`, color: STATUS_COLORS[order.status], border: `1px solid ${STATUS_COLORS[order.status]}44`, borderRadius: 99, padding: '5px 12px', fontFamily: dFont, fontSize: 12, fontWeight: 700, cursor: order.status === 'servi' ? 'not-allowed' : 'pointer', outline: 'none', opacity: order.status === 'servi' ? 0.6 : 1 }}>
                              {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <span style={{ color: D.gold, fontWeight: 800, fontSize: 16 }}>{fmt(order.total)}</span>
                            <button onClick={() => deleteOrder(order.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.red }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {order.items.map((it, i) => (
                            <span key={i} style={{ background: D.bg, color: D.muted, fontSize: 12, padding: '4px 12px', borderRadius: 99, border: `1px solid ${D.border}` }}>
                              {it.qty}× {it.name}
                            </span>
                          ))}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                          {order.comment && (
                              <div style={{ background: D.gold + '22', color: D.gold, fontSize: 12, padding: '4px 12px', borderRadius: 99, border: `1px solid ${D.gold}44` }}>
                                  Note: {order.comment}
                              </div>
                          )}
                          <div style={{ fontSize: 12, color: D.muted }}>Paiement: {order.paymentMethod}</div>
                          {order.paymentMethod !== 'Cash' && order.status === 'en attente' && (
                              <button onClick={() => updateStatus(order.id, 'servi')} style={{ background: D.green, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                                  Marquer comme Payé
                              </button>
                          )}
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}
          {tab === 'floor' && (
            <div>
                <h2 style={s.sectionTitle}>Plan de Salle</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 20 }}>
                    {['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8'].map(tableName => {
                        const status = getTableStatus(tableName);
                        const colors = { libre: D.muted, occupée: D.gold, prêt: D.green };
                        return (
                            <div key={tableName} style={{ background: D.card, padding: 20, borderRadius: 12, textAlign: 'center', border: `2px solid ${colors[status] || colors.libre}` }}>
                                <Utensils style={{ color: colors[status] || colors.libre, marginBottom: 8 }} />
                                <div style={{ color: D.text, fontWeight: 700 }}>{tableName}</div>
                                <div style={{ color: colors[status] || colors.libre, fontSize: 11, textTransform: 'uppercase' }}>{status}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
          )}
          {tab === 'stats' && (
            <div>
              <h2 style={s.sectionTitle}>Statistiques</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
                <StatCard label="Chiffre semaine" value="537 000 FCFA" icon={TrendingUp} color={D.green} />
                <StatCard label="Commandes mois" value="248" icon={Receipt} color={D.blue} />
                <StatCard label="Panier moyen" value="7 200 FCFA" icon={Utensils} color={D.purple} />
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
                      <div key={item.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ flex: 1 }}>{item.name}</div>
                        <button onClick={() => setEditItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Pencil size={16} color={D.blue} /></button>
                        <button onClick={() => setMenu(prev => ({ ...prev, [cat]: prev[cat].filter(i => i.id !== item.id) }))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} color={D.red} /></button>
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
                {Object.values(THEMES).map(th => (
                  <div key={th.id} onClick={() => setActiveTheme(th.id)}
                    style={{ background: th.card, border: `3px solid ${activeTheme === th.id ? (customThemeColors[th.id] || th.accent) : D.border}`, borderRadius: 14, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 40 }}>{th.preview.split(' ')[0]}</div>
                    <div>
                      <div style={{ color: th.text, fontWeight: 700 }}>{th.name}</div>
                      <div style={{ color: D.muted, fontSize: 12 }}>{th.sub}</div>
                    </div>
                  </div>
                ))}
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
          {tab === 'hero' && (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20}}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={s.sectionTitle}>Configuration Hero ({t.name})</h2>
                    <button onClick={saveConfig} style={{ background: accent, color: isDarkMode ? '#000' : '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Enregistrer</button>
                </div>
                <div style={{ background: D.card, padding: 20, borderRadius: 12 }}>
                    {/* ... Inputs (same as before) ... */}
                    <label style={{ color: D.muted, fontSize: 12 }}>Titre</label>
                    <input value={draftRestaurant.hero[activeTheme]?.title || ''} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], title: e.target.value}}}))} style={{...s.input, marginBottom: 10}} />
                    
                    <label style={{ color: D.muted, fontSize: 12 }}>Tagline</label>
                    <input value={draftRestaurant.hero[activeTheme]?.tagline || ''} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], tagline: e.target.value}}}))} style={{...s.input, marginBottom: 10}} />

                    <label style={{ color: D.muted, fontSize: 12 }}>Description</label>
                    <textarea value={draftRestaurant.hero[activeTheme]?.description || ''} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], description: e.target.value}}}))} style={{...s.input, marginBottom: 10, minHeight: 60}} />

                    <label style={{ color: D.muted, fontSize: 12 }}>Image</label>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], image: reader.result}}}));
                            };
                            reader.readAsDataURL(file);
                        }
                    }} style={s.input} />

                    <div style={{display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap'}}>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Couleur d'accent</label>
                            <input type="color" value={draftRestaurant.hero[activeTheme]?.color || '#F5A623'} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], color: e.target.value}}}))} style={{...s.input, padding: 5, height: 40}} />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Police</label>
                            <select value={draftRestaurant.hero[activeTheme]?.font || 'Sora'} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], font: e.target.value}}}))} style={{...s.input, height: 40}}>
                                <option>Sora</option>
                                <option>Inter</option>
                                <option>Quicksand</option>
                                <option>Cormorant Garamond</option>
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{ color: D.muted, fontSize: 12 }}>Taille Titre (px)</label>
                            <input type="number" value={draftRestaurant.hero[activeTheme]?.fontSize || 88} onChange={e => setDraftRestaurant(prev => ({...prev, hero: {...prev.hero, [activeTheme]: {...prev.hero[activeTheme], fontSize: e.target.value}}}))} style={{...s.input, height: 40}} />
                        </div>
                    </div>
                </div>
              </div>
              <div style={{ position: 'sticky', top: 20 }}>
                <h3 style={{...s.sectionTitle, fontSize: 14}}>Aperçu Hero</h3>
                <div style={{ height: 300, background: '#000', borderRadius: 12, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
                    <div style={{ position: 'absolute', inset: 0, background: `url(${draftRestaurant.hero[activeTheme]?.image || ''}) center/cover`, filter: 'brightness(.4)' }} />
                    <div style={{position: 'relative', color: '#fff', fontFamily: draftRestaurant.hero[activeTheme]?.font || 'Sora'}}>
                        <h1 style={{fontSize: 24, margin: 0, color: draftRestaurant.hero[activeTheme]?.color || accent}}>{draftRestaurant.hero[activeTheme]?.title || 'Titre'}</h1>
                        <p style={{fontSize: 12, margin: '8px 0'}}>{draftRestaurant.hero[activeTheme]?.tagline || 'Tagline'}</p>
                    </div>
                </div>
              </div>
            </div>
          )}
          {tab === 'footer' && (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20}}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={s.sectionTitle}>Personnalisation Footer & Logo</h2>
                    <button onClick={saveConfig} style={{ background: accent, color: isDarkMode ? '#000' : '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Enregistrer</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={{ background: D.card, padding: 20, borderRadius: 12 }}>
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

                        <label style={{ color: D.muted, fontSize: 12 }}>Adresse</label>
                        <input value={draftRestaurant.footer.address} onChange={e => updateFooter('address', e.target.value)} style={{...s.input, marginBottom: 10}} />
                        
                        <label style={{ color: D.muted, fontSize: 12 }}>Téléphone</label>
                        <input value={draftRestaurant.footer.phone} onChange={e => updateFooter('phone', e.target.value)} style={{...s.input, marginBottom: 10}} />
                        
                        <label style={{ color: D.muted, fontSize: 12 }}>Email</label>
                        <input value={draftRestaurant.footer.email} onChange={e => updateFooter('email', e.target.value)} style={{...s.input}} />
                    </div>
                    <div style={{ background: D.card, padding: 20, borderRadius: 12 }}>
                        <label style={{ color: D.muted, fontSize: 12 }}>Facebook</label>
                        <input value={draftRestaurant.footer.socials.facebook} onChange={e => updateSocial('facebook', e.target.value)} style={{...s.input, marginBottom: 10}} />
                        
                        <label style={{ color: D.muted, fontSize: 12 }}>Instagram</label>
                        <input value={draftRestaurant.footer.socials.instagram} onChange={e => updateSocial('instagram', e.target.value)} style={{...s.input, marginBottom: 10}} />
                        
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginTop: 10 }}>
                            <input type="checkbox" checked={draftRestaurant.footer.newsletterEnabled} onChange={e => updateFooter('newsletterEnabled', e.target.checked)} />
                            <span style={{ color: D.text }}>Activer Newsletter</span>
                        </label>
                    </div>
                </div>
              </div>
              <div style={{ position: 'sticky', top: 20 }}>
                <h3 style={{...s.sectionTitle, fontSize: 14}}>Aperçu Footer</h3>
                <div style={{ background: '#1c1c1c', color: '#fff', padding: 20, borderRadius: 12, fontSize: 12, textAlign: 'center' }}>
                    {draftRestaurant.logo && <img src={draftRestaurant.logo} style={{height: 40, marginBottom: 10}} alt="Logo" />}
                    <div style={{fontWeight: 700, marginBottom: 5}}>{draftRestaurant.name}</div>
                    <div style={{opacity: 0.7}}>{draftRestaurant.footer.address}</div>
                    <div style={{opacity: 0.7}}>{draftRestaurant.footer.phone}</div>
                    <div style={{opacity: 0.7}}>{draftRestaurant.footer.email}</div>
                    <div style={{marginTop: 10, display: 'flex', justifyContent: 'center', gap: 10, opacity: 0.6}}>
                        {draftRestaurant.footer.socials.facebook && <span>FB</span>}
                        {draftRestaurant.footer.socials.instagram && <span>IG</span>}
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

              <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 4 }}>
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
