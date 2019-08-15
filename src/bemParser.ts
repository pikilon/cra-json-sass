import { concatenateBem } from './concatenateBem'

export const bemParser = (jsonObject: JsonType) => {

  const stringArray = []
  const concatenatedValues = concatenateBem(jsonObject)
  Object.keys(concatenatedValues).forEach(blockKey => {
    const currentBlock = concatenatedValues[blockKey]
    const blockValues = Object.keys(currentBlock).map(elementKey => currentBlock[elementKey])
    blockValues.forEach(val => stringArray.push(`${val}: ${val}`))
  })

  return stringArray.join(';\n$')
}
