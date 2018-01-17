import csvToJson from 'csvtojson'

/**
 * Converts csv to a json array
 * @param {string} csvPath
 * @param {object} opts
 * @param {function} mapFn
 */
const getJson = (csvPath, opts, mapFn) =>
  new Promise((res, err) =>
    csvToJson(opts)
      .fromFile(csvPath)
      .on('json', jsonObj => mapFn(jsonObj))
      .on('end_parsed', jsonArr => res(jsonArr))
      .on('error', error => err(error)),
  )

export default getJson
