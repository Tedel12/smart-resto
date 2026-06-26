import React, { useState } from 'react';
import { THEMES, RESTAURANT } from '../data/index.js';
import { Flame, ArrowRight, ChefHat, Minus, Plus, Palmtree, Zap, Star, Leaf, Coffee, Palette } from 'lucide-react';
import Footer from './Footer.jsx';

const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

// Utility to determine if a color is light or dark to return black or white text
const getContrastColor = (hexColor) => {
  if (!hexColor) return '#fff';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

const Badge = ({ label, accent, accent2 }) => {
  const colors = { populaire: accent, chef: accent2, maison: accent2, léger: '#64B5F6', null: 'transparent' };
  const c = colors[label] || accent;
  if (!label) return null;
  return (
    <span style={{ background: c + '22', color: c, border: `1px solid ${c}44`, fontSize: 10, fontWeight: 700,
      padding: '2px 8px', borderRadius: 99, letterSpacing: 1, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {label === 'chef' && <ChefHat size={10} />}
      {label}
    </span>
  );
};

function Theme1({ menu, onAdd, cart, restaurant, theme: t }) {
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const [items, setItems] = useState(menu[activeCat]);
  const [animating, setAnimating] = useState(false);

  React.useEffect(() => {
    setItems(menu[activeCat] || []);
  }, [menu, activeCat]);

  const switchCat = (cat) => {
    if (cat === activeCat) return;
    setAnimating(true);
    setTimeout(() => { setActiveCat(cat); setItems(menu[cat] || []); setAnimating(false); }, 200);
  };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ position: 'relative', height: 520, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80) center/cover', filter: 'brightness(.25)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${t.accent}18 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontSize: 13, letterSpacing: 6, color: t.accent, marginBottom: 20, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Star size={14} /> Restaurant gastronomique <Star size={14} />
          </div>
          <h1 style={{ fontSize: 'clamp(42px,8vw,88px)', fontWeight: 800, lineHeight: 1, marginBottom: 16,
            background: `linear-gradient(135deg, #fff 30%, ${t.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {restaurant.name}
          </h1>
          <p style={{ color: t.muted, fontSize: 17, marginBottom: 36 }}>{restaurant.tagline}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '14px 32px', borderRadius: 99,
                fontSize: 14, fontWeight: 700, letterSpacing: 1, transition: 'transform .15s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Voir le menu
            </button>
          </div>
        </div>
      </div>

      <div id="menu-section" style={{ background: t.card, borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', overflowX: 'auto', gap: 4, padding: '0 16px' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => switchCat(cat)}
              style={{ padding: '18px 22px', background: 'none', border: 'none', color: activeCat === cat ? t.accent : t.muted,
                fontFamily: t.font, fontSize: 13, fontWeight: 600, letterSpacing: 1, whiteSpace: 'nowrap',
                borderBottom: `2px solid ${activeCat === cat ? t.accent : 'transparent'}`, transition: 'all .2s', cursor: 'pointer' }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20,
          opacity: animating ? 0 : 1, transition: 'opacity .2s' }}>
          {items.map((item) => {
            const qty = cart.items.find(i => i.id === item.id)?.qty || 0;
            return (
              <div key={item.id}
                style={{ background: t.card, borderRadius: t.cardRadius, border: `1px solid ${t.border}`, overflow: 'hidden',
                  transition: 'transform .3s, box-shadow .3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${t.accent}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  {item.hot && <span style={{ position: 'absolute', top: 12, right: 12, background: '#FF4757', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4, backdropFilter: 'blur(4px)' }}><Flame size={12} /> ÉPICÉ</span>}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, flex: 1, color: t.text }}>{item.name}</h3>
                    <Badge label={item.badge} accent={t.accent} accent2={t.accent2} />
                  </div>
                  <p style={{ color: t.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>{item.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
                    <span style={{ color: t.accent, fontWeight: 800, fontSize: 18 }}>{fmt(item.price)}</span>
                    {qty === 0 ? (
                      <button onClick={() => onAdd(item)}
                        style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '10px 22px', borderRadius: 99, fontSize: 12, fontWeight: 800, transition: 'all .2s', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 12px ${t.accent}44`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <Plus size={14} /> Ajouter
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.bg, padding: '4px', borderRadius: 99, border: `1px solid ${t.border}` }}>
                        <button onClick={() => cart.remove(item.id)} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                        <span style={{ fontWeight: 800, color: t.accent, minWidth: 20, textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => onAdd(item)} style={{ width: 28, height: 28, borderRadius: '50%', background: t.accent, border: 'none', color: getContrastColor(t.accent), cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer restaurant={restaurant} theme={t} />
    </div>
  );
}

function Theme2({ menu, onAdd, cart, restaurant, theme: t }) {
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ position: 'relative', background: `linear-gradient(135deg, ${t.accent}20, ${t.accent2}15)`, padding: '120px 24px 100px', textAlign: 'center', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.accent, color: getContrastColor(t.accent), fontSize: 11, fontWeight: 800, padding: '6px 18px', borderRadius: 99, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
          Coffee & Lounge
        </span>
        <h1 style={{ fontSize: 'clamp(36px,7vw,72px)', fontWeight: 800, color: t.text, marginBottom: 18, lineHeight: 1.1 }}>{restaurant.name}</h1>
        <p style={{ color: t.muted, fontSize: 18, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.6 }}>{restaurant.tagline}</p>
        <button onClick={() => document.getElementById('menu-section2')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '18px 48px', borderRadius: 99, fontSize: 16, fontWeight: 700, boxShadow: `0 10px 30px ${t.accent}44`, transition: 'all .2s', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${t.accent}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 30px ${t.accent}44`; }}>
          Explorer le Lounge <ArrowRight size={20} />
        </button>
      </div>

      <div id="menu-section2" style={{ overflowX: 'auto', display: 'flex', gap: 10, padding: '32px 16px', maxWidth: 1100, margin: '0 auto', scrollbarWidth: 'none' }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            style={{ padding: '12px 28px', borderRadius: 99, border: `2px solid ${activeCat === cat ? t.accent : t.border}`,
              background: activeCat === cat ? t.accent : 'white', color: activeCat === cat ? getContrastColor(t.accent) : t.muted,
              fontFamily: t.font, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all .2s' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {(menu[currentCat] || []).map(item => {
          const qty = cart.items.find(i => i.id === item.id)?.qty || 0;
          return (
            <div key={item.id} style={{ background: t.card, borderRadius: t.cardRadius, border: `1px solid ${t.border}`, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)', transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}>
              <div style={{ position: 'relative', height: 220 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
                  {item.hot && <span style={{ background: '#FF6B6B', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}><Flame size={14} /></span>}
                  <Badge label={item.badge} accent={t.accent} accent2={t.accent2} />
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: t.text }}>{item.name}</h3>
                <p style={{ color: t.muted, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: t.accent, fontWeight: 900, fontSize: 20 }}>{fmt(item.price)}</span>
                  {qty === 0 ? (
                    <button onClick={() => onAdd(item)}
                      style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '12px 28px', borderRadius: 99, fontSize: 14, fontWeight: 800, transition: 'all .2s', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = ''}>Ajouter</button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button onClick={() => cart.remove(item.id)} style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${t.accent}`, background: 'white', color: t.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={18} /></button>
                      <span style={{ fontWeight: 900, color: t.accent, minWidth: 24, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                      <button onClick={() => onAdd(item)} style={{ width: 36, height: 36, borderRadius: '50%', background: t.accent, border: 'none', color: getContrastColor(t.accent), cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={18} /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer restaurant={restaurant} theme={t} />
    </div>
  );
}

function Theme3({ menu, onAdd, cart, restaurant, theme: t }) {
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ background: `linear-gradient(135deg, ${t.accent}10, ${t.accent2}15)`, textAlign: 'center', padding: '100px 24px 80px', borderBottom: `4px solid ${t.border}` }}>
        <div style={{ fontSize: 12, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 16, opacity: .8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Leaf size={14} /> Pâtisseries & Délices <Leaf size={14} />
        </div>
        <h1 style={{ fontSize: 'clamp(38px,7vw,80px)', fontWeight: 900, marginBottom: 16, color: t.accent }}>{restaurant.name}</h1>
        <p style={{ fontSize: 18, opacity: .75, marginBottom: 40 }}>{restaurant.tagline}</p>
        <button onClick={() => document.getElementById('menu-section3')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '15px 44px', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s', borderRadius: t.cardRadius }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
          Notre Carte
        </button>
      </div>

      <div id="menu-section3" style={{ maxWidth: 960, margin: '0 auto', padding: '60px 16px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 50, borderBottom: `2px solid ${t.border}`, overflowX: 'auto', paddingBottom: 10 }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '16px 32px', background: 'none', border: 'none', fontFamily: t.font, fontSize: 15, fontWeight: 700,
                color: activeCat === cat ? t.accent : t.muted, borderBottom: `3px solid ${activeCat === cat ? t.accent : 'transparent'}`,
                marginBottom: -2, cursor: 'pointer', letterSpacing: 1, transition: 'all .2s', whiteSpace: 'nowrap' }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {(menu[currentCat] || []).map((item, i) => {
            const qty = cart.items.find(x => x.id === item.id)?.qty || 0;
            return (
              <div key={item.id} className="theme3-zigzag" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px', background: t.card, borderRadius: t.cardRadius, border: `1px solid ${t.border}`, boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ height: 180, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 18, color: t.text }}>{item.name}</span>
                    </div>
                    <p style={{ color: t.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 20, color: t.accent }}>{fmt(item.price)}</span>
                    {qty === 0 ? (
                      <button onClick={() => onAdd(item)} style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 800, letterSpacing: 1, cursor: 'pointer', transition: 'all .2s', borderRadius: t.cardRadius }}>AJOUTER</button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button onClick={() => cart.remove(item.id)} style={{ width: 32, height: 32, border: `1px solid ${t.border}`, background: 'white', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={16} /></button>
                        <span style={{ fontWeight: 800, color: t.accent, minWidth: 20, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                        <button onClick={() => onAdd(item)} style={{ width: 32, height: 32, background: t.accent, border: 'none', color: getContrastColor(t.accent), cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer restaurant={restaurant} theme={t} />
    </div>
  );
}

function Theme4({ menu, onAdd, cart, restaurant, theme: t }) {
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ textAlign: 'center', padding: '100px 24px 80px', background: `linear-gradient(180deg, ${t.accent}15 0%, transparent 100%)`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 12, letterSpacing: 8, color: t.accent, marginBottom: 24, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontWeight: 800 }}>
          Menu Digital Table
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 18, color: t.text }}>{restaurant.name}</h1>
        <p style={{ color: t.muted, fontSize: 17, marginBottom: 40 }}>{restaurant.tagline}</p>
        <button onClick={() => document.getElementById('menu-section4')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '18px 48px', borderRadius: t.cardRadius, fontSize: 15, fontWeight: 900, cursor: 'pointer', transition: 'all .2s' }}>
          Commander sur place <ArrowRight size={20} />
        </button>
      </div>

      <div id="menu-section4" style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 40, paddingBottom: 8, scrollbarWidth: 'none' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '12px 28px', background: activeCat === cat ? t.accent : t.card,
                border: `2px solid ${activeCat === cat ? 'transparent' : t.border}`, color: activeCat === cat ? getContrastColor(t.accent) : t.muted,
                fontFamily: t.font, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer',
                borderRadius: t.cardRadius, transition: 'all .2s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {(menu[currentCat] || []).map(item => {
            const qty = cart.items.find(i => i.id === item.id)?.qty || 0;
            return (
              <div key={item.id} style={{ background: t.card, border: `2px solid ${t.border}`, borderRadius: t.cardRadius, overflow: 'hidden', transition: 'all .3s', position: 'relative' }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, color: t.text }}>{item.name}</h3>
                  <p style={{ color: t.muted, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>{item.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 22, color: t.accent }}>{fmt(item.price)}</span>
                    {qty === 0 ? (
                      <button onClick={() => onAdd(item)}
                        style={{ background: t.accent, color: getContrastColor(t.accent), border: 'none', padding: '10px 24px', borderRadius: t.cardRadius, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
                        + Ajouter
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.bg, borderRadius: t.cardRadius, padding: '4px' }}>
                        <button onClick={() => cart.remove(item.id)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={18} /></button>
                        <span style={{ color: t.accent, fontWeight: 900, minWidth: 20, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                        <button onClick={() => onAdd(item)} style={{ width: 32, height: 32, background: t.accent, border: 'none', color: getContrastColor(t.accent), cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={18} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer restaurant={restaurant} theme={t} />
    </div>
  );
}

function Theme5({ menu, onAdd, cart, restaurant, theme: t }) {
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.bodyFont || 'Inter, sans-serif' }}>
      <div style={{ position: 'relative', height: 620, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1600&q=80"
          alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,26,21,0.9) 30%, rgba(28,26,21,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', maxWidth: 700 }}>
          <div style={{ fontFamily: t.font, fontSize: 13, letterSpacing: 8, color: t.accent2, marginBottom: 24, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
             <Palmtree size={18} /> Dakar · Cotonou · Abidjan
          </div>
          <h1 style={{ fontFamily: t.font, fontSize: 'clamp(52px,8vw,96px)', fontWeight: 600, color: '#FAF8F3', lineHeight: 1.1, marginBottom: 24, fontStyle: 'italic' }}>
            {restaurant.name}
          </h1>
          <div style={{ width: 60, height: 1, background: t.accent2, marginBottom: 32 }} />
          <p style={{ color: 'rgba(250,248,243,.8)', fontSize: 18, lineHeight: 1.8, marginBottom: 48, maxWidth: 450 }}>
            Une expérience gastronomique qui célèbre les saveurs authentiques d'Afrique de l'Ouest dans un cadre d'exception.
          </p>
          <button onClick={() => document.getElementById('menu-section5')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ alignSelf: 'flex-start', background: 'transparent', color: '#FAF8F3', border: '1px solid rgba(250,248,243,.4)',
              padding: '16px 48px', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', cursor: 'pointer', transition: 'all .4s',
              fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent2; e.currentTarget.style.borderColor = t.accent2; e.currentTarget.style.color = '#1C1A15'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(250,248,243,.4)'; e.currentTarget.style.color = '#FAF8F3'; }}>
            Découvrir la carte
          </button>
        </div>
      </div>

      <div style={{ background: t.accent, padding: '24px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
        {[
          { label: 'Authentique', icon: Leaf },
          { label: 'Produits locaux', icon: Palmtree },
          { label: 'Chef étoilé', icon: ChefHat },
          { label: 'Tradition', icon: Star }
        ].map(s => (
          <span key={s.label} style={{ color: '#FAF8F3', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 10 }}>
            <s.icon size={14} /> {s.label}
          </span>
        ))}
      </div>

      <div id="menu-section5" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px 120px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontFamily: t.font, fontSize: 13, letterSpacing: 8, color: t.accent2, marginBottom: 16, textTransform: 'uppercase' }}>Notre sélection</div>
          <h2 style={{ fontFamily: t.font, fontSize: 'clamp(32px,5vw,60px)', fontWeight: 500, color: t.text, fontStyle: 'italic' }}>La Carte du Chef</h2>
          <div style={{ width: 50, height: 1, background: t.accent2, margin: '24px auto 0' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, borderBottom: `1px solid ${t.border}`, marginBottom: 60, overflowX: 'auto', paddingBottom: 10 }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '20px 10px', background: 'none', border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13,
                letterSpacing: 4, textTransform: 'uppercase', color: activeCat === cat ? t.accent : t.muted,
                borderBottom: `2px solid ${activeCat === cat ? t.accent : 'transparent'}`, marginBottom: -1,
                cursor: 'pointer', transition: 'all .3s', fontWeight: activeCat === cat ? 700 : 400, whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {(menu[currentCat] || []).map((item, i) => {
            const qty = cart.items.find(x => x.id === item.id)?.qty || 0;
            const isLast = i === (menu[currentCat] || []).length - 1;
            return (
              <div key={item.id} className="theme5-item"
                style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 0',
                  borderBottom: isLast ? 'none' : `1px solid ${t.border}`, alignItems: 'center',
                  transition: 'all .3s' }}>
                <div style={{ width: 140, height: 140, overflow: 'hidden', flexShrink: 0, borderRadius: 2 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s', filter: 'sepia(0.2) saturate(0.8)' }} />
                </div>
                <div className="theme5-info" style={{ flex: 1, textAlign: 'center' }}>
                  <div className="theme5-info-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, marginBottom: 12 }}>
                    <h3 style={{ fontFamily: t.font, fontSize: 24, fontWeight: 500, color: t.text }}>{item.name}</h3>
                    {item.hot && <span style={{ fontSize: 12, color: t.accent2, letterSpacing: 2, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}><Flame size={14} /> Épicé</span>}
                  </div>
                  <p style={{ color: t.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{item.desc}</p>
                  {item.badge && <Badge label={item.badge} accent={t.accent} accent2={t.accent2} />}
                </div>
                <div className="theme5-price-container" style={{ textAlign: 'center', flexShrink: 0, minWidth: 160 }}>
                  <div style={{ fontFamily: t.font, fontSize: 24, fontWeight: 600, color: t.accent, marginBottom: 20 }}>{fmt(item.price)}</div>
                  {qty === 0 ? (
                    <button onClick={() => onAdd(item)}
                      style={{ background: 'transparent', color: t.accent, border: `1px solid ${t.accent}`, padding: '12px 32px',
                        fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', transition: 'all .3s',
                        fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Ajouter
                    </button>
                  ) : (
                    <div className="theme5-cart-container" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                      <button onClick={() => cart.remove(item.id)} style={{ width: 32, height: 32, border: `1px solid ${t.border}`, background: 'white', cursor: 'pointer', color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={16} /></button>
                      <span style={{ fontFamily: t.font, fontSize: 20, color: t.accent, minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                      <button onClick={() => onAdd(item)} style={{ width: 32, height: 32, background: t.accent, border: 'none', color: '#FAF8F3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} /></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: '#1C1A15', color: 'rgba(250,248,243,.4)', textAlign: 'center', padding: '60px 24px', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ color: t.accent2, marginBottom: 16, fontFamily: t.font, fontSize: 22, fontStyle: 'italic' }}>{restaurant.name}</div>
        <div style={{ marginBottom: 20 }}>{restaurant.footer.address} · {restaurant.footer.phone}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, color: 'rgba(250,248,243,.2)' }}>
           <Star size={16} /> <Star size={16} /> <Star size={16} />
        </div>
      </div>
      <Footer restaurant={restaurant} theme={t} />
    </div>
  );
}

export default function LandingPage({ menu, cart, onAdd, activeTheme, setActiveTheme, restaurant, customThemeColors }) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const t = THEMES[activeTheme];
  const adjustedTheme = { ...t, accent: customThemeColors[activeTheme] || t.accent };
  const COMPONENTS = { 1: Theme1, 2: Theme2, 3: Theme3, 4: Theme4, 5: Theme5 };
  const ActiveTheme = COMPONENTS[activeTheme];

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        @media (min-width: 768px) {
          .theme5-item { flex-direction: row !important; }
          .theme5-info { text-align: left !important; }
          .theme5-info-row { flex-direction: row !important; align-items: center !important; }
          .theme5-price-container { text-align: right !important; }
          .theme5-cart-container { justify-content: flex-end !important; }
        }
      `}</style>
      <ActiveTheme menu={menu} onAdd={onAdd} cart={cart} restaurant={restaurant} theme={adjustedTheme} />
      <div style={{ position: 'fixed', left: 20, bottom: 20, zIndex: 100 }}>
        <button onClick={() => setShowSwitcher(!showSwitcher)}
          style={{ width: 50, height: 50, borderRadius: '50%', background: adjustedTheme.accent, border: 'none', color: getContrastColor(adjustedTheme.accent), display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <Palette />
        </button>
        {showSwitcher && (
          <div style={{ position: 'absolute', bottom: 60, left: 0, background: '#fff', borderRadius: 8, padding: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.2)', width: 200 }}>
            {Object.values(THEMES).map(th => (
              <button key={th.id} onClick={() => { setActiveTheme(th.id); setShowSwitcher(false); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '10px', cursor: 'pointer', color: '#000' }}>
                {th.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
