const bemParser = (jsonObject = {}) => {
  const isObject = typeof jsonObject === 'object'
  const jsonKeys = isObject ? Object.keys(jsonObject) : []
  if (!isObject || !jsonKeys.length) return 'BEM: SHOULD BE AN OBJECT WITH LENGTH'

  const stringArray = []

  const arrayStrings = Object.keys(jsonObject).map(bemKey => {
    const block = jsonObject[bemKey]
    const isBlockObject = typeof block === 'object'
    if (!isBlockObject) {
      stringArray.push(`${bemKey}: ALL BEM CHILDREN SHOULD BE OBJECT (BLOCKS)`)
    } else {


      const blockElementsKeys = Object.keys(block)
      blockElementsKeys.forEach(blockKey => {
        const value = block[blockKey]
        let resultString;
        if (typeof value !== 'string') resultString = `${blockKey}: ALL BEM GRANDCHILDREN SHOULD BE STRING`

        // is a block key
        if (!resultString && blockKey === bemKey) resultString = `${blockKey}: ${blockKey}`

        if (!resultString) {
          const chainedName = bemKey + value
          resultString = `${chainedName}: ${chainedName}`
        }

        stringArray.push(resultString)

      })

    }

  })

  return stringArray.join(';\n$')
}

module.exports = bemParser
