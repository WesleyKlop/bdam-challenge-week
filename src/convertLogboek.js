import { logboekPaths } from './config'
import convertToSQL from './convertToSQL'
import { csvConfig, mapJsonRow, mapSqlRow } from './helpers/logboek'

const convertLogboek = async () => {
  // Remove empty channels/program rows
  const json = (await getJson(logboekPaths.csv, csvConfig, mapJsonRow)).filter(
    row => row.channel !== '' && row.what !== '',
  )

  await writeJsonToFile(json, logboekPaths.json)

  const sql = convertToSQL('logboek', json, Object.keys(json[0]), mapSqlRow)
  await writeSqlToFile(sql, logboekPaths.sql)
}

export default convertLogboek
