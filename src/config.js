import path from 'path'

export const getFilePath = (name, type) =>
  path.resolve('.', 'data', `${name}.${type}`)

export const logboekPaths = {
  base: 'LogboekRegelsAnoniem',
  csv: getFilePath('LogboekRegelsAnoniem', 'csv'),
  json: getFilePath('LogboekRegelsAnoniem', 'json'),
  sql: getFilePath('LogboekRegelsAnoniem', 'sql'),
}
