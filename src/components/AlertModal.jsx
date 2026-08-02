import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const getContrastColor = (hexColor) => {
  if (!hexColor) return '#fff';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

export default function AlertModal({ icon: Icon, title, message, color = '#10B981', buttonText = 'Parfait !', onClose, font }) {
  const textColor = getContrastColor(color);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn .2s ease' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
          background: '#fff', borderRadius: 20, width: 380, maxWidth: '100%', padding: '36px 28px 28px',
          textAlign: 'center', position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          fontFamily: font || 'inherit', animation: 'pop .3s cubic-bezier(.34,1.56,.64,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: '#F3F4F6', border: 'none', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888' }}>
          <X size={15} />
        </button>
        <div style={{
            width: 68, height: 68, borderRadius: '50%', background: color, color: textColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            boxShadow: `0 10px 30px ${color}55` }}>
          {Icon && <Icon size={32} />}
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: '#1a1a1a', marginBottom: 10 }}>{title}</h2>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 24 }}>{message}</p>
        <button onClick={onClose} style={{ width: '100%', background: color, color: textColor, border: 'none', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
