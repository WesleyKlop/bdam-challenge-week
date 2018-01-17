import path from 'path'
import fs from 'fs'

export const writeJsonToFile = (jsonArr, jsonPath) =>
  new Promise((res, err) => {
    const jsonString = JSON.stringify(jsonArr, null, 2)

    if (fs.existsSync(jsonPath)) {
      fs.unlinkSync(jsonPath)
    }

    fs.writeFile(jsonPath, jsonString, error => (error ? err(error) : res()))
  })

export const writeSqlToFile = (sqlString, sqlPath) =>
  new Promise((res, err) => {
    if (fs.existsSync(sqlPath)) {
      fs.unlinkSync(sqlPath)
    }

    fs.writeFile(sqlPath, sqlString, error => (error ? err(error) : res()))
  })
