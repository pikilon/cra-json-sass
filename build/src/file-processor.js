"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const chokidar_1 = tslib_1.__importDefault(require("chokidar"));
const sassParser_1 = require("./sassParser");
exports.default = (folder = 'src', persistent = true, fileExtension = '.scss.json') => {
    const finalPath = `${folder}/**/*${fileExtension}`;
    const watcherOptions = {
        persistent,
    };
    const watcher = chokidar_1.default.watch(finalPath, watcherOptions);
    watcher.on('all', (event, filepath) => {
        const supportedMethods = ['add', 'change', 'unlink'];
        const isEventSupported = supportedMethods.indexOf(event) >= 0;
        if (isEventSupported) {
            try {
                const fileExtensionPosition = filepath.lastIndexOf(path_1.default.extname(filepath));
                const targetFileName = filepath.substr(0, fileExtensionPosition);
                const shouldDeleteGeneratedFile = (event === 'unlink' && fs_1.default.existsSync(targetFileName));
                if (shouldDeleteGeneratedFile) {
                    fs_1.default.unlinkSync(targetFileName);
                    console.log(`${targetFileName} was removed`);
                    return;
                }
                const rawdata = fs_1.default.readFileSync(filepath, 'utf8');
                const json = JSON.parse(rawdata);
                const sassContent = sassParser_1.sassParser(json);
                fs_1.default.writeFileSync(targetFileName, sassContent);
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