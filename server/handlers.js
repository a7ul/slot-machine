const helpers = require('./helpers');

const notFoundHandler = () => ({message: 'Invalid route! Try /public/index.html'});

const randomResultHandler = () => {
  const result = [];
  const bonus = helpers.randomBoolGenerator();

  for(let i = 0; i < 3; ++i){
    result.push(helpers.randIntGenerator(0, 5));
  }

  return {result, bonus};
};

const staticFileHandler = (filePath) => helpers.readFile(filePath);

module.exports = {
  notFoundHandler,
  randomResultHandler,
  staticFileHandler
};
