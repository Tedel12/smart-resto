import { useState, useCallback, useEffect } from 'react';
import * as cartService from '../services/cartService.js';
import * as ordersService from '../services/ordersService.js';
import * as reservationsService from '../services/reservationsService.js';
import * as tablesService from '../services/tablesService.js';
import * as menuService from '../services/menuService.js';
import * as restaurantService from '../services/restaurantService.js';

export function useCart() {
  const [items, setItems] = useState(() => cartService.getCart());

  useEffect(() => {
    cartService.saveCart(items);
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
  const [orders, setOrders] = useState(() => ordersService.listOrders());
  const [archivedOrders, setArchivedOrders] = useState(() => ordersService.listArchivedOrders());

  useEffect(() => {
    ordersService.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    ordersService.saveArchivedOrders(archivedOrders);
  }, [archivedOrders]);

  const addOrder = useCallback((orderData) => {
    const total = orderData.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    setOrders(prev => [
      ...prev,
      {
        id: `ORD-${Date.now()}`,
        table: orderData.table,
        items: orderData.items,
        status: 'en attente',
        timestamp: new Date().toLocaleTimeString(),
        total: total,
        comment: orderData.comment,
        paymentMethod: orderData.paymentMethod,
        paid: false,
      }
    ]);
  }, []);

  const updateStatus = useCallback((id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  }, []);

  const markPaid = useCallback((id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, paid: true } : o));
  }, []);

  // Removing an order from the active list archives it first, so it still counts
  // toward historical revenue/stats after it's gone from "Commandes en cours".
  const deleteOrder = useCallback((id) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === id);
      if (order) setArchivedOrders(a => [...a, order]);
      return prev.filter(o => o.id !== id);
    });
  }, []);

  return { orders, archivedOrders, updateStatus, addOrder, deleteOrder, markPaid };
}

export function useReservations() {
  const [reservations, setReservations] = useState(() => reservationsService.listReservations());

  useEffect(() => {
    reservationsService.saveReservations(reservations);
  }, [reservations]);

  const addReservation = useCallback((data) => {
    const reservation = { id: `RES-${Date.now()}`, createdAt: new Date().toLocaleString('fr-FR'), ...data };
    setReservations(prev => [...prev, reservation]);
    return reservation;
  }, []);

  const deleteReservation = useCallback((id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  return { reservations, addReservation, deleteReservation };
}

export function useTableStatus(tables) {
  const [status, setStatus] = useState(() => tablesService.getTableStatusMap());

  useEffect(() => {
    tablesService.saveTableStatusMap(status);
  }, [status]);

  const setTableStatus = useCallback((table, value) => {
    setStatus(prev => ({ ...prev, [table]: value }));
  }, []);

  const getTableStatus = useCallback((table) => status[table] || 'libre', [status]);

  return { tableStatus: status, setTableStatus, getTableStatus };
}

export function useMenu(defaultMenu) {
  const [menu, setMenu] = useState(() => menuService.getMenu(defaultMenu));

  useEffect(() => {
    menuService.saveMenu(menu);
  }, [menu]);

  return [menu, setMenu];
}

export function useRestaurant(defaultRestaurant) {
  const [restaurant, setRestaurant] = useState(() => {
    const overrides = restaurantService.getRestaurantOverrides();
    const merged = { ...defaultRestaurant, ...overrides };
    merged.config = { ...defaultRestaurant.config, ...overrides.config };
    return merged;
  });

  useEffect(() => {
    restaurantService.saveRestaurant(restaurant);
  }, [restaurant]);

  return [restaurant, setRestaurant];
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}
