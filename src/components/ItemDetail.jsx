import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

const fmt = (n) => n.toLocaleString('fr-FR') + ' FCFA';

export default function ItemDetail({ item, theme, onAdd, onClose }) {
  if (!item) return null;

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: theme.bodyFont || theme.font, padding: '20px' }}>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <ArrowLeft /> Retour
      </button>

      <div style={{ maxWidth: 600, margin: '0 auto', background: theme.card, borderRadius: theme.cardRadius || 16, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
        <img src={item.img} alt={item.name} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{item.name}</h1>
          <p style={{ color: theme.accent, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{fmt(item.price)}</p>
          <p style={{ color: theme.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>{item.desc}</p>
          
          <button onClick={() => { onAdd(item); onClose(); }}
            style={{ width: '100%', background: theme.accent, color: '#fff', border: 'none', padding: '16px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Plus size={20} /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
