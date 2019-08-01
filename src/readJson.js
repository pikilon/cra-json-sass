const fs = require('fs');
const path = require('path')
const sassParser = require('./sassParser')

const readJsons = (filepath) => {
  if (fs.existsSync(filepath)) {
    const rawdata = fs.readFileSync(filepath)
    const json = JSON.parse(rawdata)
    const sassContent = sassParser(json)
    const fileExtensionPosition = filepath.lastIndexOf(path.extname(filepath))
    const targetFileName = filepath.substr(0, fileExtensionPosition)
    fs.writeFileSync(targetFileName, sassContent)
  }
}

const filepaths = process.argv && process.argv.length > 2 && process.argv.slice(2)

if (filepaths) filepaths.map(readJsons)


