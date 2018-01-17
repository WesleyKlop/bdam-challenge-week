import { escapeString, formatDate } from './common'

/**
 * @typedef logboekRow
 * @type {object}
 * @property {string} student_nummer
 * @property {string} device
 * @property {string} platform
 * @property {string} what
 * @property {*} time_watched
 * @property {number} rating
 * @property {Date} submitted
 * @property {Date} watched
 */

/**
 * config for converting csv -> json
 */
export const csvConfig = {
  delimiter: ';',
  noheader: true,
  headers: [
    'timestamp',
    'student_nummer',
    'date',
    'time',
    'device',
    'platform',
    'what',
    'time_watched',
    'rating',
  ],
}

/**
 * Maps a logboek json object as an sql string
 * @param {logboekRow} logboekRow
 * @returns {string}
 */
export const mapSqlRow = ({
  id,
  student_nummer,
  device,
  platform,
  what,
  time_watched,
  rating,
  submitted,
  watched,
}) =>
  `('${student_nummer}', '{${device
    .map(v => `"${v}"`)
    .join(', ')}}', '${platform}', '${escapeString(what)}', ${
    time_watched ? `'${time_watched}'` : 'NULL'
  }, ${rating}, ${formatDate(submitted)}, ${
    watched.toString() === 'Invalid Date' ? 'NULL' : `${formatDate(watched)}`
  })`

/**
 * Normalizes device data because the data is _VERY_ dirty
 * @param {string} device
 * @returns {string}
 */
const normalizeDevice = device => {
  if (device.includes(',')) {
    return device.split(',').map(v => normalizeDevice(v.trim()))
  }
  if (device.includes('+')) {
    return device.split('+').map(v => normalizeDevice(v.trim()))
  }
  switch (device) {
    case 'pc':
    case 'desktop':
    case 'computer':
    case 'desktop pc':
    case 'netflix':
    case 'dvd':
    case 'youtube':
      return 'computer'
    case 'televisie':
    case 'tv':
    case 'chromecast':
    case 'beamer':
    case 'arabisch kanaal':
      return 'televisie'
    case 'smartphone':
      return 'telefoon'
    case 'tablet':
      return 'tablet'
    case 'laptop':
      return 'laptop'
    case 'ps4':
    case 'xbox360':
    case 'xbox':
    case 'playstation':
      return 'console'
    case 'bioscoop':
    case 'bios':
    case 'pathe':
      return 'bioscoop'
    case '':
      return 'other'
    default:
      console.log(`Weird device: ${device}`)
      return device
  }
}

/**
 * converts original object to a @see {logboekRow}
 * @param {Object} jsonObj
 */
export const mapJsonRow = jsonObj => {
  // Convert date/time columns to date objects
  jsonObj.submitted = new Date(jsonObj.timestamp)
  jsonObj.watched = new Date(`${jsonObj.date} ${jsonObj.time}`)

  // Lowercase relevant keys
  ;['device', 'what', 'student_nummer'].forEach(v => {
    jsonObj[v] = jsonObj[v].toLowerCase().trim()
  })

  // Convert rating to a number
  jsonObj.rating = parseInt(jsonObj.rating, 10) || null

  // Normalize devices
  jsonObj.device = [].concat(normalizeDevice(jsonObj.device)) || []

  // Delete unused columns
  delete jsonObj.timestamp
  delete jsonObj.date
  delete jsonObj.time
}
