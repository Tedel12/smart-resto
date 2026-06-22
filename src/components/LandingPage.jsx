import React, { useState } from 'react';
import { THEMES, RESTAURANT } from '../data/index.js';
import { Flame, ArrowRight, ChefHat, ShoppingBasket, Check, Minus, Plus, Palmtree, Zap, Star, Leaf, Coffee, Palette } from 'lucide-react';

const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

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

function Theme1({ menu, onAdd, cart }) {
  const t = THEMES[1];
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
            {RESTAURANT.name}
          </h1>
          <p style={{ color: t.muted, fontSize: 17, marginBottom: 36 }}>{RESTAURANT.tagline}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: t.accent, color: '#000', border: 'none', padding: '14px 32px', borderRadius: 99,
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
                        style={{ background: t.accent, color: '#000', border: 'none', padding: '10px 22px', borderRadius: 99, fontSize: 12, fontWeight: 800, transition: 'all .2s', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 12px ${t.accent}44`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <Plus size={14} /> Ajouter
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.bg, padding: '4px', borderRadius: 99, border: `1px solid ${t.border}` }}>
                        <button onClick={() => cart.remove(item.id)} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                        <span style={{ fontWeight: 800, color: t.accent, minWidth: 20, textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => onAdd(item)} style={{ width: 28, height: 28, borderRadius: '50%', background: t.accent, border: 'none', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Theme2({ menu, onAdd, cart }) {
  const t = THEMES[2];
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ background: `linear-gradient(135deg, ${t.accent}15, ${t.accent2}10)`, padding: '100px 24px 80px', textAlign: 'center', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.accent, color: '#fff', fontSize: 11, fontWeight: 800, padding: '6px 18px', borderRadius: 99, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
          <Star size={12} fill="white" /> Nouveau menu
        </span>
        <h1 style={{ fontSize: 'clamp(36px,7vw,72px)', fontWeight: 800, color: t.text, marginBottom: 18, lineHeight: 1.1 }}>{RESTAURANT.name}</h1>
        <p style={{ color: t.muted, fontSize: 18, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.6 }}>{RESTAURANT.tagline}</p>
        <button onClick={() => document.getElementById('menu-section2')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: t.accent, color: '#fff', border: 'none', padding: '18px 48px', borderRadius: 99, fontSize: 16, fontWeight: 700, boxShadow: `0 10px 30px ${t.accent}44`, transition: 'all .2s', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${t.accent}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 30px ${t.accent}44`; }}>
          Commander maintenant <ArrowRight size={20} />
        </button>
      </div>

      <div id="menu-section2" style={{ overflowX: 'auto', display: 'flex', gap: 10, padding: '32px 16px', maxWidth: 1100, margin: '0 auto', scrollbarWidth: 'none' }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            style={{ padding: '12px 28px', borderRadius: 99, border: `2px solid ${activeCat === cat ? t.accent : t.border}`,
              background: activeCat === cat ? t.accent : 'white', color: activeCat === cat ? '#fff' : t.muted,
              fontFamily: t.font, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all .2s' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
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
                  {item.hot && <span style={{ background: '#FF6B6B', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 12px rgba(255,107,107,0.4)' }}><Flame size={14} /></span>}
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
                      style={{ background: t.accent, color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 99, fontSize: 14, fontWeight: 800, transition: 'all .2s', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = ''}>Ajouter</button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button onClick={() => cart.remove(item.id)} style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${t.accent}`, background: 'white', color: t.accent, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={18} /></button>
                      <span style={{ fontWeight: 900, color: t.accent, minWidth: 24, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                      <button onClick={() => onAdd(item)} style={{ width: 36, height: 36, borderRadius: '50%', background: t.accent, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={18} /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Theme3({ menu, onAdd, cart }) {
  const t = THEMES[3];
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ background: t.accent, color: '#F7F4ED', textAlign: 'center', padding: '80px 24px 70px', borderBottom: `4px solid ${t.accent2}` }}>
        <div style={{ fontSize: 12, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 16, opacity: .8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Leaf size={14} /> Depuis 1972 <Leaf size={14} />
        </div>
        <h1 style={{ fontSize: 'clamp(38px,7vw,80px)', fontWeight: 900, marginBottom: 16 }}>{RESTAURANT.name}</h1>
        <p style={{ fontFamily: t.bodyFont || t.font, fontSize: 18, opacity: .75, marginBottom: 40 }}>{RESTAURANT.tagline}</p>
        <div style={{ width: 80, height: 2, background: '#F7F4ED', margin: '0 auto 40px', opacity: .5 }} />
        <button onClick={() => document.getElementById('menu-section3')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: 'transparent', color: '#F7F4ED', border: '2px solid #F7F4ED', padding: '15px 44px', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F7F4ED'; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F7F4ED'; }}>
          Notre Carte
        </button>
      </div>

      <div id="menu-section3" style={{ maxWidth: 960, margin: '0 auto', padding: '60px 16px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 50, borderBottom: `2px solid ${t.border}` }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '16px 32px', background: 'none', border: 'none', fontFamily: t.font, fontSize: 15, fontWeight: 700,
                color: activeCat === cat ? t.accent : t.muted, borderBottom: `3px solid ${activeCat === cat ? t.accent : 'transparent'}`,
                marginBottom: -2, cursor: 'pointer', letterSpacing: 1, transition: 'all .2s' }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: t.card, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', borderRadius: 8 }}>
          {(menu[currentCat] || []).map((item, i) => {
            const qty = cart.items.find(x => x.id === item.id)?.qty || 0;
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '32px',
                borderBottom: i < (menu[currentCat] || []).length - 1 ? `1px solid ${t.border}` : 'none', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9F7F2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 120, height: 120, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: t.text }}>{item.name}</span>
                    {item.hot && <span style={{ color: t.danger, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}><Flame size={14} /> ÉPICÉ</span>}
                  </div>
                  <p style={{ color: t.muted, fontSize: 15, fontFamily: t.bodyFont || t.font, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 140 }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: t.accent, marginBottom: 16 }}>{fmt(item.price)}</div>
                  {qty === 0 ? (
                    <button onClick={() => onAdd(item)} style={{ background: t.accent, color: '#F7F4ED', border: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 800, letterSpacing: 1, cursor: 'pointer', transition: 'all .2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>AJOUTER</button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                      <button onClick={() => cart.remove(item.id)} style={{ width: 32, height: 32, border: `1px solid ${t.border}`, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={16} /></button>
                      <span style={{ fontWeight: 800, color: t.accent, minWidth: 20, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                      <button onClick={() => onAdd(item)} style={{ width: 32, height: 32, background: t.accent, border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} /></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Theme4({ menu, onAdd, cart }) {
  const t = THEMES[4];
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.font }}>
      <div style={{ textAlign: 'center', padding: '100px 24px 80px', background: `linear-gradient(180deg, ${t.accent}22 0%, transparent 100%)` }}>
        <div style={{ fontSize: 12, letterSpacing: 8, color: t.accent2, marginBottom: 24, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontWeight: 800 }}>
          <Zap size={16} fill={t.accent2} /> Live · Fast · Fresh <Zap size={16} fill={t.accent2} />
        </div>
        <h1 style={{ fontSize: 'clamp(48px,10vw,100px)', fontWeight: 900, lineHeight: .9, marginBottom: 24,
          textShadow: `0 0 40px ${t.accent}aa`, letterSpacing: -2 }}>
          <span style={{ color: t.accent }}>{RESTAURANT.name.split(' ')[0]}</span>
          {' '}{RESTAURANT.name.split(' ').slice(1).join(' ')}
        </h1>
        <p style={{ color: t.muted, fontSize: 17, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>{RESTAURANT.tagline}</p>
        <button onClick={() => document.getElementById('menu-section4')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: '#0A0A1A', border: 'none',
            padding: '18px 48px', borderRadius: 4, fontSize: 15, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase',
            boxShadow: `0 0 30px ${t.accent}88`, cursor: 'pointer', transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) rotate(-1deg)'; e.currentTarget.style.boxShadow = `0 0 50px ${t.accent}aa`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 0 30px ${t.accent}88`; }}>
          Commander <ArrowRight size={20} />
        </button>
      </div>

      <div id="menu-section4" style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 40, padding: '4px 0', scrollbarWidth: 'none' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '12px 28px', background: activeCat === cat ? `linear-gradient(135deg, ${t.accent}, ${t.accent2})` : t.card,
                border: `2px solid ${activeCat === cat ? 'transparent' : t.border}`, color: activeCat === cat ? '#0A0A1A' : t.muted,
                fontFamily: t.font, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer',
                borderRadius: 4, transition: 'all .2s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {(menu[currentCat] || []).map(item => {
            const qty = cart.items.find(i => i.id === item.id)?.qty || 0;
            return (
              <div key={item.id} style={{ background: t.card, border: `2px solid ${t.border}`, borderRadius: t.cardRadius, overflow: 'hidden',
                transition: 'all .3s', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.boxShadow = `0 0 30px ${t.accent}33`; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .8 }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${t.card} 10%, transparent 70%)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    {item.hot && <span style={{ background: t.accent, color: '#000', fontSize: 10, fontWeight: 900, padding: '4px 8px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4 }}><Flame size={12} fill="black" /></span>}
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    {item.badge && <Badge label={item.badge} accent={t.accent} accent2={t.accent2} />}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, color: t.text }}>{item.name}</h3>
                  <p style={{ color: t.muted, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>{item.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 22, color: t.accent2, textShadow: `0 0 15px ${t.accent2}44` }}>{fmt(item.price)}</span>
                    {qty === 0 ? (
                      <button onClick={() => onAdd(item)}
                        style={{ background: t.accent, color: '#0A0A1A', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 13, fontWeight: 900, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}>
                        + Add
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.bg, borderRadius: 4, padding: '4px' }}>
                        <button onClick={() => cart.remove(item.id)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', color: t.text, cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={18} /></button>
                        <span style={{ color: t.accent, fontWeight: 900, minWidth: 20, textAlign: 'center', fontSize: 16 }}>{qty}</span>
                        <button onClick={() => onAdd(item)} style={{ width: 32, height: 32, background: t.accent, border: 'none', color: '#0A0A1A', cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={18} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Theme5({ menu, onAdd, cart }) {
  const t = THEMES[5];
  const cats = Object.keys(menu);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const currentCat = menu[activeCat] ? activeCat : cats[0];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: t.bodyFont || 'Inter, sans-serif' }}>
      <style>{`
        @media (min-width: 768px) {
          .theme5-item { flex-direction: row !important; }
          .theme5-info { text-align: left !important; }
          .theme5-info-row { flex-direction: row !important; align-items: center !important; }
          .theme5-price-container { text-align: right !important; }
          .theme5-cart-container { justify-content: flex-end !important; }
        }
      `}</style>
      <div style={{ position: 'relative', height: 620, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1600&q=80"
          alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,26,21,0.9) 30%, rgba(28,26,21,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', maxWidth: 700 }}>
          <div style={{ fontFamily: t.font, fontSize: 13, letterSpacing: 8, color: t.accent2, marginBottom: 24, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
             <Palmtree size={18} /> Dakar · Cotonou · Abidjan
          </div>
          <h1 style={{ fontFamily: t.font, fontSize: 'clamp(52px,8vw,96px)', fontWeight: 600, color: '#FAF8F3', lineHeight: 1.1, marginBottom: 24, fontStyle: 'italic' }}>
            {RESTAURANT.name}
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, borderBottom: `1px solid ${t.border}`, marginBottom: 60 }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '20px 10px', background: 'none', border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13,
                letterSpacing: 4, textTransform: 'uppercase', color: activeCat === cat ? t.accent : t.muted,
                borderBottom: `2px solid ${activeCat === cat ? t.accent : 'transparent'}`, marginBottom: -1,
                cursor: 'pointer', transition: 'all .3s', fontWeight: activeCat === cat ? 700 : 400 }}>
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
        <div style={{ color: t.accent2, marginBottom: 16, fontFamily: t.font, fontSize: 22, fontStyle: 'italic' }}>{RESTAURANT.name}</div>
        <div style={{ marginBottom: 20 }}>Cotonou · République du Bénin · +229 00 00 00 00</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, color: 'rgba(250,248,243,.2)' }}>
           <Star size={16} /> <Star size={16} /> <Star size={16} />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ menu, cart, onAdd, activeTheme, setActiveTheme }) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const t = THEMES[activeTheme];
  const COMPONENTS = { 1: Theme1, 2: Theme2, 3: Theme3, 4: Theme4, 5: Theme5 };
  const ActiveTheme = COMPONENTS[activeTheme];

  return (
    <div style={{ position: 'relative' }}>
      <ActiveTheme menu={menu} onAdd={onAdd} cart={cart} />

      <div style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 100, display: 'flex', flexDirection: 'column-reverse', gap: 12 }}>
        <button onClick={() => setShowSwitcher(s => !s)}
          style={{ width: 56, height: 56, borderRadius: '50%', background: t.accent || '#F5A623', border: `4px solid white`, color: '#fff',
            fontSize: 18, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <Palette size={24} />
        </button>
        {showSwitcher && Object.values(THEMES).map(th => (
          <button key={th.id} onClick={() => { setActiveTheme(th.id); setShowSwitcher(false); }}
            title={th.name}
            style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${activeTheme === th.id ? 'white' : 'transparent'}`,
              background: th.accent, cursor: 'pointer', fontSize: 13, fontWeight: 800, color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}>
            {th.id}
          </button>
        ))}
      </div>
    </div>
  );
}
