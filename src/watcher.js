const fs = require('fs');
const path = require('path')
const sassParser = require('./sassParser')
const watch = require('node-watch');

const args = process.argv && process.argv.length > 2 && process.argv.slice(2)

if (args) {
  let [ folder, regex ] = args
  const filter = regex || /.+(?=\.scss\.json)/
  const watchOptions = {
    recursive: true,
    filter,
  }
  watch(folder, watchOptions, (evt, filepath) => {
    try {
      const rawdata = fs.readFileSync(filepath)
      const json = JSON.parse(rawdata)
      const sassContent = sassParser(json)
      const fileExtensionPosition = filepath.lastIndexOf(path.extname(filepath))
      const targetFileName = filepath.substr(0, fileExtensionPosition)
      fs.writeFileSync(targetFileName, sassContent)

      console.log(`"${filepath}" was succesful updated`);

    } catch (error) {
      console.log('error', error);
      console.log('filepath', filepath);
    }

  });

/*   const readJsons = (filepath) => {
    if (fs.existsSync(filepath)) {
      const rawdata = fs.readFileSync(filepath)
      const json = JSON.parse(rawdata)
      const sassContent = sassParser(json)
      const fileExtensionPosition = filepath.lastIndexOf(path.extname(filepath))
      const targetFileName = filepath.substr(0, fileExtensionPosition)
      fs.writeFileSync(targetFileName, sassContent)
    }
  } */
}


