const modules = {
  0: [
    function (require, module, exports) {
      "use strict";

      var _message = require("./message.js");
      // {default: "hello world!""}
      var _message2 = _interopRequireDefault(_message);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      // 바벨은 _interopRequireDefault라는 함수를 사용해 ES Module(ESM) 코드를
      // CommonJS 모듈의 문법으로 변환하여 두 모듈을 같이 사용할 수 있도록 한다.

      // ESM의 내보내기 문법을 사용한 모듈에는 module.exports.__esModule 플래그를 true로 설정한다.
      // 그리고 ESM 형식의 기본값(=> import fs from 'fs') 가져오기 코드를 만나면 _interopRequireDefault() 함수를 생성하고,
      // 가져온 객체를 그대로 사용하지 않고 객체의 default 프로퍼티에 접근하여 사용하도록 코드를 변경한다.
      // 이렇게 바꿔주면 CommonJS 모듈은 module.exports에 할당한 객체가
      // 새로운 객체의 default 프로퍼티에 할당되어 감싸진 상태로 반환된다.
      // => 참고(https://tech.kakao.com/2020/12/01/frontend-growth-02/)
      console.log(_message2.default);
    },
    { "./message.js": 1 },
  ],

  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      // ESM의 내보내기 문법을 사용한 모듈에는 module.exports.__esModule 플래그를 true로 설정한다.
      var _name = require("./name.js");

      exports.default = "hello " + _name.name + "!";
    },
    { "./name.js": 2 },
  ],
  2: [
    function (require, module, exports) {
      "use strict";
      // ESM의 내보내기 문법을 사용한 모듈에는 module.exports.__esModule 플래그를 true로 설정한다.
      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      var name = (exports.name = "world");
    },
    {},
  ],
};
