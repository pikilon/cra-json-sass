import fs from 'fs'
import defaultConfig from '../default-config.json'

export default () => {
const CONFIG_JSON_PATHNAME = './config-cra-json-sass.json'
  let args = defaultConfig

  if (fs.existsSync(CONFIG_JSON_PATHNAME)) {
    try {
      const rawdata = fs.readFileSync(CONFIG_JSON_PATHNAME, 'utf8')
      const jsonData = JSON.parse(rawdata)
      args = { ...args, ...jsonData }
    } catch (error) {
      console.log(`The config file: ${CONFIG_JSON_PATHNAME} could not be read`, error);
    }
  }
  return args
}
