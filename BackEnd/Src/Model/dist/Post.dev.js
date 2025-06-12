"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postSchema = new _mongoose["default"].Schema({
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  Day: [{
    type: String
  }],
  location: [{
    type: String
  }]
}, {
  timestamps: true
});

var Post = _mongoose["default"].model('Post', postSchema);

var _default = Post;
exports["default"] = _default;
//# sourceMappingURL=Post.dev.js.map
