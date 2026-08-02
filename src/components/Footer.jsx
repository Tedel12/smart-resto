import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const getContrastColor = (hexColor) => {
  if (!hexColor) return '#fff';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

export default function Footer({ restaurant, theme, activeTheme }) {
  const footer = restaurant?.config?.[activeTheme]?.footer || {};
  const accent = theme.accent;
  const accentText = getContrastColor(accent);

  const ContactRow = ({ icon: Icon, value }) => !value ? null : (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={14} />
      </span>
      {value}
    </span>
  );

  return (
    <footer style={{ background: theme.bg === '#0A0C0F' ? '#050608' : theme.card,
                     borderTop: `1px solid ${theme.border}`,
                     color: theme.muted,
                     padding: '64px 24px 32px',
                     fontFamily: theme.bodyFont || theme.font }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48, paddingBottom: 40 }}>
        <div>
          <h3 style={{ color: theme.text, fontSize: 19, fontWeight: 700, marginBottom: 14 }}>{restaurant?.name || ''}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>{restaurant?.tagline || ''}</p>
        </div>

        <div>
          <h4 style={{ color: theme.text, fontSize: 13, fontWeight: 700, marginBottom: 20, letterSpacing: 1.5, textTransform: 'uppercase' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ContactRow icon={MapPin} value={footer.address} />
            <ContactRow icon={Phone} value={footer.phone} />
            <ContactRow icon={Mail} value={footer.email} />
          </div>
        </div>

        <div>
          <h4 style={{ color: theme.text, fontSize: 13, fontWeight: 700, marginBottom: 20, letterSpacing: 1.5, textTransform: 'uppercase' }}>Suivez-nous</h4>
          <div style={{ display: 'flex', gap: 12 }}>
            {footer.socials?.facebook && (
              <a href={footer.socials.facebook} style={{ width: 36, height: 36, borderRadius: '50%', background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = accentText; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.color = accent; }}>
                <FaFacebook />
              </a>
            )}
            {footer.socials?.instagram && (
              <a href={footer.socials.instagram} style={{ width: 36, height: 36, borderRadius: '50%', background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = accentText; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.color = accent; }}>
                <FaInstagram />
              </a>
            )}
          </div>

          {footer.newsletterEnabled && (
            <div style={{ marginTop: 28 }}>
              <h4 style={{ color: theme.text, fontSize: 13, fontWeight: 700, marginBottom: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>Newsletter</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="email" placeholder="Votre email" style={{ background: theme.bg, border: `1px solid ${theme.border}`, padding: '10px 12px', borderRadius: 8, width: '100%', color: theme.text, fontFamily: 'inherit', fontSize: 13, outline: 'none' }} />
                <button style={{ background: accent, color: accentText, border: 'none', padding: '10px 18px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: `1px solid ${theme.border}`, paddingTop: 24, fontSize: 12, opacity: 0.7 }}>
        © {new Date().getFullYear()} {restaurant?.name || ''} — Tous droits réservés
      </div>
    </footer>
  );
}
