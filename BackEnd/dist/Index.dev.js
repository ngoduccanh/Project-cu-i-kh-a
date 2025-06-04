"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Database = _interopRequireDefault(require("./Src/Confic/Database.js"));

var _authRouter = require("./Src/Router/authRouter.js");

var _postRoutes = require("./Src/Router/postRoutes.js");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;
(0, _Database["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/auth', _authRouter.authRouter);
app.use('/posts', _postRoutes.postRouter);
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Server is running'
  });
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
