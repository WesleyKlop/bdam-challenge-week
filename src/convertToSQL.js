/**
 * Converts data into a sql insert query
 * @param {string} table
 * @param {logboekRow[]} jsonArray
 * @param {string[]} keys
 * @param {function} mapFn
 */
const convertToSQL = (table, jsonArray, keys, mapFn) => {
  let string = `INSERT INTO ${table} (${keys.join(', ')})
VALUES `

  return jsonArray
    .map(mapFn)
    .reduce((prev, curr, i) => `${prev}${i > 0 ? ',\n  ' : ''}${curr}`, string)
}

export default convertToSQL
