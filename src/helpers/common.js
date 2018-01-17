/**
 * Formats a date
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = date =>
  date instanceof Date
    ? `'${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`
    : 'NULL'

/**
 * Escapes not allowed characters in a string
 * @param {string} val
 * @returns {string}
 */
export const escapeString = val =>
  val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function(s) {
    switch (s) {
      case '\0':
        return '\\0'
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\b':
        return '\\b'
      case '\t':
        return '\\t'
      case '\x1a':
        return '\\Z'
      case "'":
        return "''"
      case '"':
        return '""'
      default:
        return '\\' + s
    }
  })
