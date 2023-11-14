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

4. 이제 entry를 기점으로 그래프를 순회한다.

   - entry부터 dependencies를 조회하며 각 모듈과 해당 모듈에 의존하고 있는 모듈간의 관계(mapping)을 정의한다. 이렇게 queue에는 관계(mapping)이 배열로 종속성 graph를 완성한다.

5. 하나로 합치는 번들 과정을 진행한다.
   - 각 모듈의 스코프를 지정하기 위해 모듈을 CommonJS의 require, module, exports를 사용할 수 있는 함수로 감싸주며 bundle string 형태로 이어준다. "{0:[], 1:[], 2:[], ...}"
   - 최종 번들 된 객체를 실행시키기위해 IIFE 함수를 만들어 실행할 수 있는 환경을 만들어준다. 브라우저에선 CommonJS의 require, module, exports를 사용할 수 없기 때문에 직접 구현해준다.  
     `var _message = require("./message.js");`와 같은 경우 직접 구현한 require를 통해 mapping에서 `./message.js` key값과 일치하는 id 값을 찾아 해당 id값에 해당하는 모듈의 종속성을 찾기 위해 재귀적으로 require를 실행한다  
     require(localRequire): 모듈의 mapping에 존재하는 경로 key를 찾아 해당 id 모듈을 분석 후 module의 exports를 반환한다.  
     export: CommonJS로 컴파일된 코드의 exports를 사용하기위해 module의 exports 객체를 만들어준다.  
     번들된 코드의 보다 자세한 내용은 `src/modules.js`를 참고한다.
