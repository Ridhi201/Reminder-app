/**
 * Project is plain JS (not TypeScript) so these JSDoc typedefs document
 * shapes for editor intellisense without adding a build step. Migrate to
 * .ts/.tsx later by lifting these definitions directly into interfaces.
 *
 * @typedef {Object} Reminder
 * @property {string} id
 * @property {string} title
 * @property {string} [notes]
 * @property {string} dueDate - ISO date string
 * @property {"pending"|"completed"|"overdue"} status
 * @property {string} [categoryId]
 *
 * @typedef {Object} Habit
 * @property {string} id
 * @property {string} title
 * @property {string} frequency - e.g. "daily" | "weekly"
 * @property {number} streak
 *
 * @typedef {Object} Goal
 * @property {string} id
 * @property {string} title
 * @property {number} progress - 0–100
 * @property {string} [targetDate]
 *
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {"text"|"checklist"|"drawing"|"voice"} type
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} isPremium
 */

export {};
