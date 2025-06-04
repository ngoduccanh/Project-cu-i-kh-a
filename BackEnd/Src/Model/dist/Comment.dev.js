"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentSchema = new _mongoose["default"].Schema({
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Comment = _mongoose["default"].model('Comment', commentSchema);

var _default = Comment;
exports["default"] = _default;
//# sourceMappingURL=Comment.dev.js.map
