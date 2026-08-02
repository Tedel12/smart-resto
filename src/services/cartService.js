// Cart — see ordersService.js for the swap-to-backend intent.
import { readStorage, writeStorage } from '../lib/storage.js';

const CART_KEY = 'sr_cart';

export function getCart() {
  return readStorage(CART_KEY, []);
}

export function saveCart(items) {
  writeStorage(CART_KEY, items);
}
