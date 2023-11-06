const fs = require("fs");
const babylon = require("babylon");

let id = 0;

function getAsset(path) {
  const content = fs.readFileSync(path, "utf-8");
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  return ast;
}

function createGraph(path) {
  const asset = getAsset(path);
  console.log(asset);
}

const graph = createGraph("./example/entry.js");
