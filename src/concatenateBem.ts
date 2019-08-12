export const concatenateBem = (Bem: BemDictionaryType): BemDictionaryType => {
  const result: BemDictionaryType = {}
  const blockKeys: Array<string> = Object.keys(Bem);

  blockKeys.forEach(blockKey => {
    const blockResult: BemElementType = { block: blockKey }
    const blockValue = Bem[blockKey];
    const elementKeys: Array<string> = Object.keys(blockValue)

    elementKeys.forEach(elementKey => {
      const elementValue = blockValue[elementKey]
      blockResult[elementKey] = blockKey + elementValue
    })

    result[blockKey] = blockResult;
  })

  return result
}
