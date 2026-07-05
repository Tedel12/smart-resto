import React from 'react';
import { X, Check } from 'lucide-react';

export default function ReservationModal({ onClose, onReserve, tables, restaurant }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', padding: 24, borderRadius: 16, width: 400, maxWidth: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800 }}>Réserver une table</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {tables.map(table => (
                        <button key={table} 
                                onClick={() => onReserve(table)}
                                style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd', background: restaurant.table === table ? '#10B981' : '#f9f9f9', color: restaurant.table === table ? '#fff' : '#000', cursor: 'pointer', fontWeight: 600 }}>
                            {table}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
