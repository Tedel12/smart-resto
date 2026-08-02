// Menu — see ordersService.js for the swap-to-backend intent.
import { readStorage, writeStorage } from '../lib/storage.js';

const MENU_KEY = 'sr_menu';

export function getMenu(fallback) {
  return readStorage(MENU_KEY, fallback);
}

export function saveMenu(menu) {
  writeStorage(MENU_KEY, menu);
}
