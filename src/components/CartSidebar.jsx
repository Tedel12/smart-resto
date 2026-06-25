import React, { useState } from 'react';

const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function CartSidebar({ cart, onClose, onCheckout, theme }) {
  const { items, remove, total } = cart;
  const [comment, setComment] = useState('');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, fontFamily: theme.bodyFont || theme.font }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: '#000a' }} />

      {/* Panel */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 440,
        background: theme.bg, borderLeft: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column',
        animation: 'slide .25s ease' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <div>
            <h2 style={{ color: theme.text, fontSize: 18, fontWeight: 700 }}>Ma commande</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginTop: 2 }}>{items.length} article(s)</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: theme.card, border: `1px solid ${theme.border}`,
            color: theme.muted, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: theme.muted, marginTop: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
              <p style={{ fontSize: 15 }}>Votre panier est vide</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Ajoutez des plats depuis le menu</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: `1px solid ${theme.border}` }}>
              <img src={item.img} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: theme.text, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: theme.accent, fontWeight: 700, fontSize: 13 }}>{fmt(item.price)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button onClick={() => cart.add(item)} style={{ width: 26, height: 26, borderRadius: '50%', background: theme.accent, border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                <span style={{ color: theme.text, fontWeight: 700, fontSize: 15 }}>{item.qty}</span>
                <button onClick={() => remove(item.id)} style={{ width: 26, height: 26, borderRadius: '50%', background: theme.bg, border: `1px solid ${theme.border}`, color: theme.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: `1px solid ${theme.border}`, background: theme.card }}>
            <textarea 
                placeholder="Spécifications (ex: peu épicé...)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: 15, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, color: theme.text, fontFamily: theme.bodyFont || theme.font, resize: 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: theme.muted, fontSize: 13 }}>Sous-total</span>
              <span style={{ color: theme.text, fontWeight: 600 }}>{fmt(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: theme.muted, fontSize: 13 }}>Service (5%)</span>
              <span style={{ color: theme.text, fontWeight: 600 }}>{fmt(Math.round(total * 0.05))}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
              <span style={{ color: theme.text, fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ color: theme.accent, fontWeight: 800, fontSize: 20 }}>{fmt(Math.round(total * 1.05))}</span>
            </div>
            <button onClick={() => onCheckout(comment)}
              style={{ width: '100%', padding: '15px', background: theme.accent, border: 'none', borderRadius: 10,
                color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: theme.bodyFont || theme.font,
                transition: 'transform .15s, box-shadow .15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
              ✓ Envoyer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
