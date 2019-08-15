export const BLOCK_KEY = 'block'

export const concatenateBem = (Bem: JsonType): JsonType => {
  const result: JsonType = {}
  const blockKeys: Array<string> = Object.keys(Bem);

  blockKeys.forEach(blockKey => {
    const blockResult: JsonType = { [BLOCK_KEY]: blockKey }
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
