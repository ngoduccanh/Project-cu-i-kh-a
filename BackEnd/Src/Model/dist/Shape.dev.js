"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var shapeSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Shape = _mongoose["default"].model("Shape", shapeSchema);

var _default = Shape;
exports["default"] = _default;
//# sourceMappingURL=Shape.dev.js.map
