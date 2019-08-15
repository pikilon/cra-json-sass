"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concatenateBem_1 = require("./concatenateBem");
exports.bemParser = (jsonObject) => {
    const stringArray = [];
    const concatenatedValues = concatenateBem_1.concatenateBem(jsonObject);
    Object.keys(concatenatedValues).forEach(blockKey => {
        const currentBlock = concatenatedValues[blockKey];
        const blockValues = Object.keys(currentBlock).map(elementKey => currentBlock[elementKey]);
        blockValues.forEach(val => stringArray.push(`${val}: ${val}`));
    });
    return stringArray.join(';\n$');
};
//# sourceMappingURL=bemParser.js.map