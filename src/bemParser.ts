import { concatenateBem } from './concatenateBem'

export const bemParser = (jsonObject: BemDictionaryType) => {

  const stringArray = []
  const concatenatedValues = concatenateBem(jsonObject)
  Object.keys(concatenatedValues).forEach(blockKey => {
    Object.values(concatenatedValues[blockKey]).forEach(val => stringArray.push(`${val}: ${val}`))
  })

  return stringArray.join(';\n$')
}
