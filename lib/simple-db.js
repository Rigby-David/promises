const fs = require('node:fs/promises');
const path = require('path');
// const fs = require('node:fs/promises');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  // create a file path, path.join with the file you're pulling and JSON extension at the end
  // take that file path and return where you're reading the file

  get(id) {
    this.filePath = path.join(this.dirPath, `${id}.json`);
    return (
      fs
        .readFile(this.filePath)
        // OR .then((file) => JSON.parse(file))
        .then(JSON.parse)
        .catch((e) => {
          if (e.body === 'ENOENT') {
            throw new Error(`no such file: ${this.filePath}`);
          }
          throw e;
          // console.error('Error in promise chain', e);
        })
    );
  }
}

module.exports = SimpleDb;
