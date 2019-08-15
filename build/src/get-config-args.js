"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const default_config_json_1 = tslib_1.__importDefault(require("../default-config.json"));
exports.default = () => {
    const CONFIG_JSON_PATHNAME = './config-cra-json-sass.json';
    let args = default_config_json_1.default;
    if (fs_1.default.existsSync(CONFIG_JSON_PATHNAME)) {
        try {
            const rawdata = fs_1.default.readFileSync(CONFIG_JSON_PATHNAME, 'utf8');
            const jsonData = JSON.parse(rawdata);
            args = Object.assign({}, args, jsonData);
        }
        catch (error) {
            console.log(`The config file: ${CONFIG_JSON_PATHNAME} could not be read`, error);
        }
    }
    return args;
};
//# sourceMappingURL=get-config-args.js.map