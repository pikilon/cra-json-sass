
const TAB = ' ';
const SIMPLE_TYPES = ['string', 'number', 'boolean']

const sassParser = (json, level = 0, isLast = false, indent = '') => {
  if (typeof json === 'function') return 'THE FUNCTIONS ARE NOT ALLOWED'
  const isSimpleOrFalsy = SIMPLE_TYPES.indexOf(typeof json) >= 0 || !json
  if (isSimpleOrFalsy) return json;
  const rootSuffix = ';'
  const nestedSuffix = ','
  const isRootLevel = level < 2;
  const isDeepLevel = level >= 1;

  let prefix = '$'
  let suffix = rootSuffix
  let finalIndent = ''
  if (isDeepLevel) {
    prefix = ''
    let levelIndent = 0;
    finalIndent = indent + TAB
    suffix = nestedSuffix
  }

  if (typeof json === 'object') {
    const arrayToIterate = Object.keys(json);
    const lines = arrayToIterate.map((key, index) => {
      const isLastElement = (index + 1) === arrayToIterate.length
      const result = `${prefix}${key}: ${sassParser(json[key], level + 1, isLastElement, finalIndent)}`
      return result
    })

    let joinedLines = lines.join(`${suffix}\n${finalIndent}`)
    let suffixObject = isRootLevel ? rootSuffix : nestedSuffix;
    if (isLast && !isRootLevel) suffixObject = ''

    if (isDeepLevel) joinedLines = `(\n${finalIndent}${joinedLines}\n${indent})${suffixObject}`

    return joinedLines;
  }
}

module.exports = sassParser
