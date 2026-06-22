import React from 'react';
import { D, dFont } from '../data/index.js';

const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CartSidebar({ cart, onClose, onCheckout }) {
  const { items, remove, total } = cart;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: '#000a' }} />

      {/* Panel */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 440,
        background: D.card, borderLeft: `1px solid ${D.border}`, display: 'flex', flexDirection: 'column',
        fontFamily: dFont, animation: 'slide .25s ease' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${D.border}` }}>
          <div>
            <h2 style={{ color: D.text, fontSize: 18, fontWeight: 700 }}>Ma commande</h2>
            <p style={{ color: D.muted, fontSize: 12, marginTop: 2 }}>{items.length} article(s)</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: D.bg, border: `1px solid ${D.border}`,
            color: D.muted, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: D.muted, marginTop: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
              <p style={{ fontSize: 15 }}>Votre panier est vide</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Ajoutez des plats depuis le menu</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: `1px solid ${D.border}` }}>
              <img src={item.img} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: D.text, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: D.gold, fontWeight: 700, fontSize: 13 }}>{fmt(item.price)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button onClick={() => cart.add(item)} style={{ width: 26, height: 26, borderRadius: '50%', background: D.gold, border: 'none', color: '#000', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                <span style={{ color: D.text, fontWeight: 700, fontSize: 15 }}>{item.qty}</span>
                <button onClick={() => remove(item.id)} style={{ width: 26, height: 26, borderRadius: '50%', background: D.bg, border: `1px solid ${D.border}`, color: D.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: `1px solid ${D.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: D.muted, fontSize: 13 }}>Sous-total</span>
              <span style={{ color: D.text, fontWeight: 600 }}>{fmt(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: D.muted, fontSize: 13 }}>Service (5%)</span>
              <span style={{ color: D.text, fontWeight: 600 }}>{fmt(Math.round(total * 0.05))}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, paddingTop: 12, borderTop: `1px solid ${D.border}` }}>
              <span style={{ color: D.text, fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ color: D.gold, fontWeight: 800, fontSize: 20 }}>{fmt(Math.round(total * 1.05))}</span>
            </div>
            <button onClick={onCheckout}
              style={{ width: '100%', padding: '15px', background: D.gold, border: 'none', borderRadius: 10,
                color: '#000', fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: dFont,
                transition: 'transform .15s, box-shadow .15s', boxShadow: `0 4px 20px ${D.gold}44` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 32px ${D.gold}66`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 20px ${D.gold}44`; }}>
              ✓ Envoyer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
