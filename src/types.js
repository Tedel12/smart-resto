// JSDoc-only shape reference for the domain objects currently persisted client-side
// (see src/services/*). No runtime code — meant as the contract a backend/API would
// need to reproduce. Not enforced by the build (this project is plain JS, not TS).

/**
 * @typedef {Object} MenuItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} img
 * @property {string} desc
 * @property {boolean} hot
 * @property {'populaire'|'chef'|'maison'|'léger'|null} badge
 */

/** @typedef {Object.<string, MenuItem[]>} Menu - keyed by category name */

/**
 * @typedef {Object} OrderItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} qty
 */

/**
 * @typedef {Object} Order
 * @property {string} id - e.g. "ORD-<timestamp>"; a real backend should assign this
 * @property {string} table
 * @property {OrderItem[]} items
 * @property {'en attente'|'en cours'|'prêt'|'servi'} status
 * @property {string} timestamp - locale time string, display-only
 * @property {number} total
 * @property {string} [comment]
 * @property {string} paymentMethod
 * @property {boolean} paid - set once staff taps "Encaisser"; drives revenue reporting
 */

/**
 * @typedef {Object} Reservation
 * @property {string} id - e.g. "RES-<timestamp>"; a real backend should assign this
 * @property {string} createdAt
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phone
 * @property {string} [address]
 * @property {string} date - ISO date (yyyy-mm-dd)
 * @property {string} time - HH:mm
 * @property {number} guests
 * @property {string[]} tables - table names, e.g. ["Table 1", "Table 2"]
 */

/** @typedef {Object.<string, 'libre'|'occupée'|'réservée'>} TableStatusMap - keyed by table name */

/**
 * @typedef {Object} HeroConfig
 * @property {string} title
 * @property {string} tagline
 * @property {string} description
 * @property {string} image - URL or data: URI
 * @property {string} color - hex accent override
 * @property {string} font
 * @property {number} fontWeight
 * @property {number} fontSize
 * @property {number} overlayOpacity - 0-95, darkens the hero image
 * @property {string} buttonText
 */

/**
 * @typedef {Object} Highlight
 * @property {string} icon - key into LandingPage's HIGHLIGHT_ICONS map
 * @property {string} label
 */

/**
 * @typedef {Object} ThemeConfig - one per template id (1-5), see RESTAURANT.config
 * @property {HeroConfig} hero
 * @property {Object} footer
 * @property {Object} cta
 * @property {Highlight[]} highlights
 * @property {1|2|3} navLayout
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} name
 * @property {string} tagline
 * @property {string} logo - URL or data: URI
 * @property {Object.<number, ThemeConfig>} config - keyed by template id
 * @property {string} table - the table currently active on this device/kiosk
 */

export {};
