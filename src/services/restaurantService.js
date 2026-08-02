// Restaurant profile & per-template config — see ordersService.js for the swap-to-backend intent.
import { readStorage, writeStorage } from '../lib/storage.js';

const RESTAURANT_KEY = 'sr_restaurant';

export function getRestaurantOverrides() {
  return readStorage(RESTAURANT_KEY, {});
}

export function saveRestaurant(restaurant) {
  writeStorage(RESTAURANT_KEY, restaurant);
}
