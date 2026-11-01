/**
 * General utility helpers
 */

/**
 * Combines class names conditionally (lightweight alternative to clsx)
 * @param  {...any} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a phone number or contact string for tel: links
 * @param {string} phone
 * @returns {string}
 */
export function formatPhoneLink(phone) {
  return phone.replace(/[^\d+]/g, "");
}

