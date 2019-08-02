
const TAB = ' ';
const SIMPLE_TYPES = ['string', 'number', 'boolean']

const sassParser = (json, level = 0, isLast = false, indent = '') => {
  if (typeof json === 'function') return 'THE FUNCTIONS ARE NOT ALLOWED'
  const isSimpleOrFalsy = SIMPLE_TYPES.indexOf(typeof json) >= 0 || !json
  if (isSimpleOrFalsy) return json;

  //is Object
  const finalIndent = indent + TAB
  const isDeepLevel = level >= 1;
  const joinerString = isDeepLevel ? `,\n${finalIndent}` : ';\n$'
  const arrayToIterate = Object.keys(json);

  const lines = arrayToIterate.map((key, index) => {
    const isLastElement = (index + 1) === arrayToIterate.length
    return `${key}: ${sassParser(json[key], level + 1, isLastElement, finalIndent)}`
  })

  const joinedLines = lines.join(joinerString)
  const result = isDeepLevel ? `(\n${finalIndent}${joinedLines}\n${indent})` : `$${joinedLines};\n`
  return result;
}

module.exports = sassParser
