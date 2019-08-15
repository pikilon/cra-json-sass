"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bemParser_1 = require("./bemParser");
exports.BEM_INDEX = 'BEM';
const TAB = ' ';
const SIMPLE_TYPES = ['string', 'number', 'boolean'];
exports.sassParser = (json, level = 0, indent = '') => {
    const isSimpleOrFalsy = SIMPLE_TYPES.indexOf(typeof json) >= 0;
    if (isSimpleOrFalsy)
        return json;
    const finalIndent = indent + TAB;
    const isDeepLevel = level >= 1;
    const joinerString = isDeepLevel ? `,\n${finalIndent}` : ';\n$';
    const arrayToIterate = Object.keys(json);
    const isArray = Array.isArray(json);
    const lines = arrayToIterate.map(key => {
        const isBEM = (!isDeepLevel && key === exports.BEM_INDEX);
        const value = json[key];
        const prefixKey = isArray ? '' : `${key}: `;
        const resultString = isBEM ? bemParser_1.bemParser(value) : prefixKey + exports.sassParser(value, level + 1, finalIndent);
        return resultString;
    });
    const joinedLines = lines.join(joinerString);
    const result = isDeepLevel ? `(\n${finalIndent}${joinedLines}\n${indent})` : `$${joinedLines};\n`;
    return result;
};
//# sourceMappingURL=sassParser.js.map