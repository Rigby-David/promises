const fs = require('fs/promises');
const crypto = require('crypto');
const path = require('path');

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

  save(obj) {
    obj.id = crypto.randomBytes(4).toString('hex');
    const data = JSON.stringify(obj);
    return fs.writeFile(`${this.dirPath}/${obj.id}.json`, data).then(() => obj);
  }

  getAll() {
    //Get all the objects in the directory.
    return fs.readdir(this.dirPath).then((paths) => {
      const promises = paths.map((path) => {
        return fs.lstat(`${this.dirPath}/${path}`).then((stat) => {
          if (stat.isDirectory()) {
            return '';
          } else {
            return fs
              .readFile(`${this.dirPath}/${path}`)
              .then((fileData) => JSON.parse(fileData.toString()));
          }
        });
      });
      return Promise.all(promises).then((fileDatas) => {
        fileDatas.forEach((fileData) => {
          console.log(fileData);
        });
        return fileDatas;
      });
    });
  }
}

module.exports = SimpleDb;
