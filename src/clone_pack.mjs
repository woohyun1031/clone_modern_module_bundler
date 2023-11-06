import fs from "fs";

let id = 0;

function getAsset(path) {
  const content = fs.readFileSync(path, "utf-8");
  console.log(content);
}

function createGraph(path) {
  const asset = getAsset(path);
  console.log(asset);
}

const graph = createGraph("./example/entry.js");
