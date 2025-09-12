/**
 * Success response helper
 * @param {*} data - Response data
 * @param {number} status - HTTP status code (default: 200)
 */
const success = (data, status = 200) => ({
  success: true,
  data,
  status
});

/**
 * Error response helper
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (default: 400)
 */
const error = (message, status = 400) => ({
  success: false,
  error: message,
  status
});

module.exports = {
  success,
  error
};
