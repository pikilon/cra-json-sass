"use strict";
const bemParser = require('./bemParser');
const TAB = ' ';
const SIMPLE_TYPES = ['string', 'number', 'boolean'];
const BEM_INDEX = 'BEM';
const sassParser = (json, level = 0, isLast = false, indent = '') => {
    if (typeof json === 'function')
        return 'THE FUNCTIONS ARE NOT ALLOWED';
    const isSimpleOrFalsy = SIMPLE_TYPES.indexOf(typeof json) >= 0 || !json;
    if (isSimpleOrFalsy)
        return json;
    const finalIndent = indent + TAB;
    const isDeepLevel = level >= 1;
    const joinerString = isDeepLevel ? `,\n${finalIndent}` : ';\n$';
    const arrayToIterate = Object.keys(json);
    const lines = arrayToIterate.map((key, index) => {
        const isBEM = (!isDeepLevel && key === BEM_INDEX);
        const value = json[key];
        const isLastElement = (index + 1) === arrayToIterate.length;
        const resultString = isBEM ? bemParser(value) : `${key}: ${sassParser(json[key], level + 1, isLastElement, finalIndent)}`;
        return resultString;
    });
    const joinedLines = lines.join(joinerString);
    const result = isDeepLevel ? `(\n${finalIndent}${joinedLines}\n${indent})` : `$${joinedLines};\n`;
    return result;
};
module.exports = sassParser;
//# sourceMappingURL=sassParser.js.map