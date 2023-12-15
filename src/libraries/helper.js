/**
 * Helper function to generate a random nano ID.
 * @param {number} [length=21] - The length of the generated ID (default: 21).
 * @returns {string} A randomly generated ID.
 */
function customNanoId (length = 21) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const id = []
  const alphaLength = alphabet.length // Optimized to retrieve alphabet length once

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphaLength)
    id.push(alphabet[randomIndex])
  }

  return id.join('')
}

/**
 * Removes all non-alphanumeric characters from the input string.
 * @param {string} input - The string to be sanitized.
 * @returns {string} - A new string containing only alphanumeric characters.
 */
function sanitizeAlphanumeric (input) {
  // Replace all characters that are not alphanumeric with an empty string
  return input.replace(/[^a-zA-Z0-9\s]/g, '');
}

export { customNanoId, sanitizeAlphanumeric }
