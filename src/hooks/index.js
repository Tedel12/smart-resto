import { useState, useCallback, useEffect } from 'react';

export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sr_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sr_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const add = useCallback((item) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === item.id);
      if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === id);
      if (!ex) return prev;
      if (ex.qty === 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, clear, total, count };
}

export function useOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sr_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id:'CMD-001', table:'Table 3', items:[{name:'Poulet DG',qty:2,price:5500},{name:'Jus de bissap',qty:2,price:800}], status:'en cours', time:'13:42', total:12600 },
      { id:'CMD-002', table:'Table 7', items:[{name:'Poisson braisé',qty:1,price:6000},{name:'Jollof Rice',qty:1,price:4500}], status:'prêt', time:'13:55', total:10500 },
      { id:'CMD-003', table:'Table 1', items:[{name:'Burger maison',qty:3,price:4700}], status:'servi', time:'12:30', total:14100 },
      { id:'CMD-004', table:'Table 5', items:[{name:'Pizza Margherita',qty:2,price:5200},{name:'Coca-Cola',qty:4,price:700}], status:'en cours', time:'14:05', total:13200 },
      { id:'CMD-005', table:'Table 2', items:[{name:'Couscous royal',qty:2,price:5800}], status:'en attente', time:'14:10', total:11600 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sr_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const updateStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const deleteOrder = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, []);

  const addOrder = useCallback((order) => {
    const newOrder = {
      id: `CMD-${String(Date.now()).slice(-4)}`,
      table: order.table || 'Table ?',
      items: order.items,
      status: 'en attente',
      time: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }),
      total: order.items.reduce((s, i) => s + i.price * i.qty, 0),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  return { orders, updateStatus, addOrder, deleteOrder };
}
