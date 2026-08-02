// Central place for environment-driven config. Currently everything runs client-only
// against localStorage (see src/services/*). When a backend exists, point VITE_API_URL
// at it (see .env.example) — services are the intended seam for wiring real requests in.

export const API_BASE_URL = import.meta.env.VITE_API_URL || null;
export const HAS_BACKEND = Boolean(API_BASE_URL);
