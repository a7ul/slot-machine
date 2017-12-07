const path = require('path');
const fs  = require('fs');

const randIntGenerator = (min, max) => {
  const randomFloat = (Math.random() * (max + 1)) + min;
  return parseInt(randomFloat);
}

const randomBoolGenerator = ()=>{
  return Math.random() >= 0.5;
}

const readFile = (filePath) => {
  const fullPath = path.resolve(__dirname, '../app', filePath);
  return new Promise((resolve, reject)=>{
    fs.readFile(fullPath, function read(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

module.exports = {
  randIntGenerator,
  randomBoolGenerator,
  readFile
}
