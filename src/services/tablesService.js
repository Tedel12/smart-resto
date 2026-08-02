// Table statuses (floor plan) — see ordersService.js for the swap-to-backend intent.
import { readStorage, writeStorage } from '../lib/storage.js';

const TABLES_KEY = 'sr_tables';

export function getTableStatusMap() {
  return readStorage(TABLES_KEY, {});
}

export function saveTableStatusMap(map) {
  writeStorage(TABLES_KEY, map);
}
