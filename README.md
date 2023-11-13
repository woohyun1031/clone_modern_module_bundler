# clone modern module bundler

[minipack](https://github.com/ronami/minipack), [Webpack](https://github.com/webpack/webpack), [Browserify](https://github.com/browserify/browserify), [Parcel](https://github.com/parcel-bundler/parcel)과 같은

다양한 모듈 번들러를 클론 코딩하여 modern module bundler 구현 및 테스트

1. babylon.parse를 사용하여 content를 AST(추상 구문 트리)로 변환
   - 의미별로 분리하여 컴퓨터가 이해할 수 있는 구조로 변경
   - 컴파일러에 자주 사용되는 자료구조
   - https://astexplorer.net/ 에서 예시 확인
2. babel-traverse 사용
   - 노드를 탐색하고 업데이트하기 위해 babylon.parse와 함께 사용
   - AST를 순회하며 ImportDeclaration type을 찾아 value를 반환한다.
   - https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-traverse
   - https://babeljs.io/docs/babel-types#importdeclaration: importdeclaration뿐만이 아닌 AST 노드의 타입들을 확인할 수 있다.
3. transformFromAst 메서드로 "env"프리셋을 사용하여 ECMAScript 버전을 자동으로 감지하여 CommonJS 기반의 코드로 변환한다.

   ```
   "use strict";

   var _message = require("./message.js");

   var _message2 = _interopRequireDefault(_message);

   function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

   console.log(_message2.default);
   ```

4.
