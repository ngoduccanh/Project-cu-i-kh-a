"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../Controllers/UserController.js"));

var _CheckUser = _interopRequireDefault(require("../Middleware/CheckUser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRouter = _express["default"].Router();

exports.authRouter = authRouter;
authRouter.post('/register', _UserController["default"].register);
authRouter.post('/login', _UserController["default"].login);
authRouter.post('/CreatUser', _CheckUser["default"], _UserController["default"].CreatUser);
authRouter.get('/UserInfor', _CheckUser["default"], _UserController["default"].UserInfor);
authRouter.put('/UpdateUser/:userId', _CheckUser["default"], _UserController["default"].UpdateUser);
authRouter.get('/getAllUser', _UserController["default"].getAllUsers);
//# sourceMappingURL=authRouter.dev.js.map
