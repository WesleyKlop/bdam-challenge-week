/**
 * Get the unique values contained in a column
 * @param {object[]} array
 * @param {string} key
 * @deprecated please use SELECT DISTINCT in the database as that is better suited for this
 */
const getUniqueValues = (array, key) => {
  const set = new Set()
  array.forEach(obj => {
    const v = obj[key]
    if (!set.has(v)) {
      set.add(v)
    }
  })
  return [...set]
}

export default getUniqueValues
