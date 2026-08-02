import React, { useState } from 'react';
import { X, User, Phone, MapPin, Calendar, Clock, Users, Utensils, Check } from 'lucide-react';

const getContrastColor = (hexColor) => {
  if (!hexColor) return '#fff';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

const todayISO = () => new Date().toISOString().split('T')[0];

export default function ReservationModal({ onClose, onSubmit, tables, tableStatus, accent = '#F5A623', font }) {
    const textColor = getContrastColor(accent);
    const [form, setForm] = useState({
        firstName: '', lastName: '', phone: '', address: '',
        date: todayISO(), time: '19:00', guests: 2, tables: [],
    });
    const [error, setError] = useState('');

    const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const toggleTable = (table) => {
        if ((tableStatus[table] || 'libre') === 'réservée' && !form.tables.includes(table)) return;
        setForm(prev => ({
            ...prev,
            tables: prev.tables.includes(table) ? prev.tables.filter(t => t !== table) : [...prev.tables, table]
        }));
    };

    const inputStyle = {
        width: '100%', padding: '12px 14px 12px 40px', borderRadius: 10, border: '1px solid #E2E2E2',
        background: '#FAFAFA', color: '#1a1a1a', fontSize: 14, fontFamily: font || 'inherit', outline: 'none',
    };
    const labelStyle = { fontSize: 12, fontWeight: 700, color: '#666', marginBottom: 6, display: 'block' };
    const fieldWrap = { position: 'relative' };
    const iconStyle = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' };

    const handleSubmit = () => {
        if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) {
            setError('Merci de renseigner au moins le nom, prénom et téléphone.');
            return;
        }
        if (form.tables.length === 0) {
            setError('Sélectionnez au moins une table.');
            return;
        }
        setError('');
        onSubmit({ ...form, guests: Number(form.guests) || form.tables.length });
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{
                background: '#fff', borderRadius: 18, width: 520, maxWidth: '100%', maxHeight: '92vh',
                overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', fontFamily: font || 'inherit'
            }}>
                <div style={{
                    position: 'sticky', top: 0, background: accent, color: textColor, padding: '18px 22px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Réserver une table</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.2)', color: textColor, cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={18} />
                    </button>
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Prénom *</label>
                            <div style={fieldWrap}>
                                <User size={16} style={iconStyle} />
                                <input style={inputStyle} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Prénom" />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Nom *</label>
                            <div style={fieldWrap}>
                                <User size={16} style={iconStyle} />
                                <input style={inputStyle} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Nom" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Numéro de téléphone *</label>
                        <div style={fieldWrap}>
                            <Phone size={16} style={iconStyle} />
                            <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+229 00 00 00 00" />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Adresse</label>
                        <div style={fieldWrap}>
                            <MapPin size={16} style={iconStyle} />
                            <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Adresse (facultatif)" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Date *</label>
                            <div style={fieldWrap}>
                                <Calendar size={16} style={iconStyle} />
                                <input type="date" min={todayISO()} style={inputStyle} value={form.date} onChange={e => set('date', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Heure *</label>
                            <div style={fieldWrap}>
                                <Clock size={16} style={iconStyle} />
                                <input type="time" style={inputStyle} value={form.time} onChange={e => set('time', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Nombre de personnes</label>
                        <div style={fieldWrap}>
                            <Users size={16} style={iconStyle} />
                            <input type="number" min={1} style={inputStyle} value={form.guests} onChange={e => set('guests', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Table(s) — {form.tables.length} sélectionnée{form.tables.length > 1 ? 's' : ''}</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8 }}>
                            {tables.map(table => {
                                const st = tableStatus[table] || 'libre';
                                const selected = form.tables.includes(table);
                                const disabled = st === 'réservée' && !selected;
                                return (
                                    <button key={table} type="button" onClick={() => toggleTable(table)} disabled={disabled}
                                        style={{
                                            padding: '10px 6px', borderRadius: 10, border: `1.5px solid ${selected ? accent : '#E2E2E2'}`,
                                            background: selected ? accent : disabled ? '#F0F0F0' : '#fff',
                                            color: selected ? textColor : disabled ? '#aaa' : '#333',
                                            cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 12,
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all .15s'
                                        }}>
                                        <Utensils size={14} />
                                        {table}
                                        {disabled && <span style={{ fontSize: 9, fontWeight: 600 }}>Réservée</span>}
                                        {selected && <Check size={12} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {error && <div style={{ color: '#D32F2F', fontSize: 13, fontWeight: 600, background: '#FDECEA', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

                    <button onClick={handleSubmit}
                        style={{ background: accent, color: textColor, border: 'none', padding: '15px', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', marginTop: 4 }}>
                        Confirmer la réservation
                    </button>
                </div>
            </div>
        </div>
    );
}
