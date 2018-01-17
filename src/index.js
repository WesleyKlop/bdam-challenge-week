import { include } from '../data/characters-include.json'
import { characters } from '../data/characters.json'
import { house } from '../data/characters-houses.json'
import { gender } from '../data/characters-gender.json'

const getUniqueKeys = jsonArr => {
  const flattened = Object.keys(
    jsonArr.reduce((prev, curr) => ({ ...prev, ...curr }), {}),
  )

  console.log(flattened)
  console.log(`There are ${flattened.length} unique keys`)
}

console.log(`${include.filter(e => e.include).length} characters-include.json`)
console.log(
  `${house.reduce(
    (prev, curr) => prev + curr.characters.length,
    0,
  )} characters-house.json`,
)
console.log(
  `${gender.reduce(
    (prev, curr) => prev + curr.characters.length,
    0,
  )} characters-gender.json`,
)
console.log(`${characters.length} characters.json`)
