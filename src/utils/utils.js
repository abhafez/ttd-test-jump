const path = require("path");
const fs = require("fs");

function mkdirRecurse(inputPath) {
  if (fs.existsSync(inputPath)) {
    return;
  }
  const basePath = path.dirname(inputPath);
  console.log('basePath', basePath);
  console.log('inputPath', inputPath);
  if (fs.existsSync(basePath)) {
    fs.mkdirSync(inputPath);
  }
  mkdirRecurse(basePath);
}

mkdirRecurse('helpers/hello');