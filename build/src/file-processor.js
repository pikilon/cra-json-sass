"use strict";
const fs = require('fs');
const path = require('path');
const sassParser = require('./sassParser');
const chokidar = require('chokidar');
module.exports = (folder = 'src', persistent = true, fileExtension = '.scss.json') => {
    const finalPath = `${folder}/**/*${fileExtension}`;
    const watcherOptions = {
        persistent,
    };
    const watcher = chokidar.watch(finalPath, watcherOptions);
    watcher.on('all', (event, filepath) => {
        const supportedMethods = ['add', 'change', 'unlink'];
        const isEventSupported = supportedMethods.indexOf(event) >= 0;
        if (isEventSupported) {
            try {
                const fileExtensionPosition = filepath.lastIndexOf(path.extname(filepath));
                const targetFileName = filepath.substr(0, fileExtensionPosition);
                const shouldDeleteGeneratedFile = (event === 'unlink' && fs.existsSync(targetFileName));
                if (shouldDeleteGeneratedFile) {
                    fs.unlinkSync(targetFileName);
                    console.log(`${targetFileName} was removed`);
                    return;
                }
                const rawdata = fs.readFileSync(filepath);
                const json = JSON.parse(rawdata);
                const sassContent = sassParser(json);
                fs.writeFileSync(targetFileName, sassContent);
                console.log(`"${filepath}" was succesful updated`);
            }
            catch (error) {
                console.log('error', error);
                console.log('filepath', filepath);
            }
        }
    });
};
//# sourceMappingURL=file-processor.js.map