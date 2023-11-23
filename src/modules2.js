function modules_start(modules, entryId) {
  function require(id) {
    const [fn, mapping] = modules[id];
    function localRequire(path) {
      return require(mapping[path]);
    }
    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }
  require(entryId);
}
modules_start(
  {
    0: [
      function (require, module, exports) {
        "use strict";
        var _message = require("./message.js");
        var _message2 = _interopRequireDefault(_message);
        var _messages = require("./messages.js");
        var _messages2 = _interopRequireDefault(_messages);
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        console.log(_message2.default); // hello message!1
        console.log(_messages2.default);
        // hello Default!2 => message, messages에서 호출되는 name 모듈은 각각 다른 스코프에서 동작한다.
      },
      { "./message.js": 1, "./messages.js": 2 },
    ],
    1: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        var _name = require("./name.js");
        var name = (0, _name.changeName)("message");
        exports.default = "hello " + name + "!1";
      },
      { "./name.js": 3 },
    ],
    2: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });

        var _name = require("./name.js");

        var name = (0, _name.changeName)();
        exports.default = "hello " + name + "!2";
      },
      { "./name.js": 4 },
    ],
    3: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        var __default__ = "Default";

        var changeName = (exports.changeName = function changeName(name) {
          __default__ = name ? name : __default__;
          var result = __default__;
          return result;
        });
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        var __default__ = "Default";
        var changeName = (exports.changeName = function changeName(name) {
          __default__ = name ? name : __default__;
          var result = __default__;
          return result;
        });
      },
      {},
    ],
  },
  0
);

// ------------------------------------------------------------------------------------------

function fc_main(require, module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  var _name = require("./name.js");

  var name = (0, _name.changeName)();
  exports.default = "hello " + name + "!2";
}

function require(id) {
  const [fc_module, mapping] = modules[id]; // [fc_module, {}]

  function localRequire(path) {
    // ./name.js
    // require를 통해 요청되는 부분
    return require(mapping[path]);
  }
  const module = { exports: {} };

  function fc_module(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    var __default__ = "Default";
    var changeName = (exports.changeName = function changeName(name) {
      __default__ = name ? name : __default__;
      var result = __default__;
      return result;
    });
  }
  fc_module(localRequire, module, module.exports); // module.exports에 값을 넣어준다.
  // module: {exports: { changeName: function(){...}}}
  return module.exports; // module.exports 반환
}

function fc_module(require, module, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true,
  });
  var __default__ = "Default";
  var changeName = (exports.changeName = function changeName(name) {
    __default__ = name ? name : __default__;
    var result = __default__;
    return result;
  });
}
