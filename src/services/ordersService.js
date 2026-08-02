// Orders — currently backed by localStorage. Swap the bodies below for real HTTP calls
// (and make the hook that consumes this async) once a backend exists; callers in
// hooks/index.js only depend on this module's exports, not on the storage mechanism.
import { readStorage, writeStorage } from '../lib/storage.js';

const ORDERS_KEY = 'sr_orders';
const ARCHIVED_KEY = 'sr_archived_orders';

export function listOrders() {
  return readStorage(ORDERS_KEY, []);
}

export function saveOrders(orders) {
  writeStorage(ORDERS_KEY, orders);
}

export function listArchivedOrders() {
  return readStorage(ARCHIVED_KEY, []);
}

export function saveArchivedOrders(orders) {
  writeStorage(ARCHIVED_KEY, orders);
}
