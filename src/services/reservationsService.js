// Reservations — see ordersService.js for the swap-to-backend intent.
import { readStorage, writeStorage } from '../lib/storage.js';

const RESERVATIONS_KEY = 'sr_reservations';

export function listReservations() {
  return readStorage(RESERVATIONS_KEY, []);
}

export function saveReservations(reservations) {
  writeStorage(RESERVATIONS_KEY, reservations);
}
