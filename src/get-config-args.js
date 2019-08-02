const fs = require('fs');

module.exports = () => {
const CONFIG_JSON_PATHNAME = './config-cra-json-config.json'
  let args = {}

  if (fs.existsSync(CONFIG_JSON_PATHNAME)) {
    try {
      const rawdata = fs.readFileSync(CONFIG_JSON_PATHNAME)
      args = JSON.parse(rawdata)
    } catch (error) {
      console.log(`The config file: ${CONFIG_JSON_PATHNAME} could not be read`, error);
    }
    return args
  }
}
