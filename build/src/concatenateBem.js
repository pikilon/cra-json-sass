"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCK_KEY = 'block';
exports.concatenateBem = (Bem) => {
    const result = {};
    const blockKeys = Object.keys(Bem);
    blockKeys.forEach(blockKey => {
        const blockResult = { [exports.BLOCK_KEY]: blockKey };
        const blockValue = Bem[blockKey];
        const elementKeys = Object.keys(blockValue);
        elementKeys.forEach(elementKey => {
            const elementValue = blockValue[elementKey];
            blockResult[elementKey] = blockKey + elementValue;
        });
        result[blockKey] = blockResult;
    });
    return result;
};
//# sourceMappingURL=concatenateBem.js.map