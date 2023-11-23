const fs = require("fs");
const babel = require("@babel/parser");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");
const path = require("path");

let ID = 0;

function getAsset(path) {
  const content = fs.readFileSync(path, "utf-8");
  const ast = babel.parse(content, {
    sourceType: "module",
  });
  const dependencies = [];
  const id = ID++;
  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "ImportDeclaration") {
        dependencies.push(path.node.source.value);
      }
    },
  });
  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });

  return {
    id,
    code,
    filename: path,
    dependencies,
  };
}

function createGraph(entryPath) {
  const entryAsset = getAsset(entryPath);
  const queue = [entryAsset];
  for (asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath); // ./example ./message.js
      const childAsset = getAsset(absolutePath);
      asset.mapping[relativePath] = childAsset.id;
      queue.push(childAsset);
    });
  }
  return queue;
}

function bundle(dependencyGraph) {
  let bundleString = "";
  dependencyGraph.forEach((module) => {
    bundleString += `${module.id}: [
      function (require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],`;
  });
  const result = `
    function modules_start(modules, entryId) {
      function require(id) {
        const [fn, mapping] = modules[id];      
        function localRequire(path) {
          return require(mapping[path]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);      
        return module.exports;
      }
      require(entryId);
    }
    modules_start({${bundleString}}, ${dependencyGraph?.[0]?.id})
    `;
  return result;
}
// ({${bundleString}}, ${dependencyGraph?.[0]?.id})
const graph = createGraph("./example/entry.js");
const result = bundle(graph);
eval(result); // hello world!

// 번들의 자세한 코드는 src/modules.js 파일 참고
