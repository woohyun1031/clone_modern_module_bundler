const modules = {
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

      console.log(_message2.default);
      console.log(_messages2.default);
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

      exports.default = "hello " + _name.name + "!";
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

      exports.default = "hello " + _name.name + "!2";
    },
    { "./name.js": 4 },
  ],
  3: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      var name = (exports.name = "world");
    },
    {},
  ],
  4: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      var name = (exports.name = "world");
    },
    {},
  ],
};
