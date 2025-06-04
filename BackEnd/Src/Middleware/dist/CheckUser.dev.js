"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../Model/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CheckUser = function CheckUser(req, res, next) {
  var authHeader, tokenParts, apiKey, apiKeyParts, userId, user;
  return regeneratorRuntime.async(function CheckUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.authorization;

          if (authHeader) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Tài khoản chưa được cung cấp"
          }));

        case 3:
          tokenParts = authHeader.split(' ');

          if (!(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer')) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'apiKey không đúng định dạng'
          }));

        case 6:
          apiKey = tokenParts[1];
          apiKeyParts = apiKey.split('-');

          if (!(apiKeyParts.length !== 4 || apiKeyParts[0] !== 'mern')) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'apiKey không đúng định dạng'
          }));

        case 10:
          userId = apiKeyParts[1];
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(_User["default"].findById(userId));

        case 14:
          user = _context.sent;

          if (user) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'apiKey không hợp lệ hoặc user không tồn tại'
          }));

        case 17:
          req.user = user;
          next();
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](11);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: 'Lỗi hệ thống khi xác thực apiKey'
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 21]]);
};

var _default = CheckUser;
exports["default"] = _default;
//# sourceMappingURL=CheckUser.dev.js.map
