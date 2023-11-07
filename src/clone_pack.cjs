const fs = require("fs");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

let ID = 0;

function getAsset(path) {
  const content = fs.readFileSync(path, "utf-8");
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  const dependencies = [];
  const id = ID++;

  traverse(ast, {
    enter(path) {
      if (path.node.type === "ImportDeclaration") {
        dependencies.push(path.node.source.value);
      }
    },
  });

  return {
    id,
    filename: path,
    dependencies,
  };
}

function createGraph(path) {
  const asset = getAsset(path);
  console.log(asset);
}

const graph = createGraph("./example/entry.js");
