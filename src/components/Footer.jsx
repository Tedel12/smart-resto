import React from 'react';
import { Mail, Phone, MapPin, } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
export default function Footer({ restaurant, theme }) {
  const { footer } = restaurant;

  return (
    <footer style={{ background: theme.bg === '#0A0C0F' ? '#050608' : theme.card, 
                     borderTop: `1px solid ${theme.border}`, 
                     color: theme.muted, 
                     padding: '60px 24px', 
                     fontFamily: theme.bodyFont || theme.font }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
        <div>
          <h3 style={{ color: theme.text, fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{restaurant.name}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{restaurant.tagline}</p>
        </div>

        <div>
          <h4 style={{ color: theme.text, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MapPin size={16} /> {footer?.address || ''}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Phone size={16} /> {footer?.phone || ''}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Mail size={16} /> {footer.email}</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: theme.text, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Suivez-nous</h4>
          <div style={{ display: 'flex', gap: 15 }}>
            <a href={footer.socials.facebook} style={{ color: theme.accent }}><FaFacebook /></a>
            <a href={footer.socials.instagram} style={{ color: theme.accent }}><FaInstagram /></a>
          </div>
          
          {footer.newsletterEnabled && (
            <div style={{ marginTop: 25 }}>
              <h4 style={{ color: theme.text, fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Newsletter</h4>
              <div style={{ display: 'flex', gap: 5 }}>
                <input type="email" placeholder="Votre email" style={{ background: theme.bg, border: `1px solid ${theme.border}`, padding: '8px', borderRadius: 4, width: '100%', color: theme.text }} />
                <button style={{ background: theme.accent, color: '#fff', border: 'none', padding: '8px 15px', borderRadius: 4, cursor: 'pointer' }}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
