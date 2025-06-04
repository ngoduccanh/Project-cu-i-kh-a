"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String
  },
  age: {
    type: String
  },
  gender: {
    type: String,
    "enum": ['male', 'female', 'other']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String,
    "default": 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    "default": ''
  },
  followers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});
userSchema.pre('save', function _callee(next) {
  var user, err, salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context.next = 18;
            break;
          }

          if (!(!user.password || user.password.length < 6)) {
            _context.next = 5;
            break;
          }

          err = new Error('Mật khẩu phải có ít nhất 6 ký tự');
          return _context.abrupt("return", next(err));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 8:
          salt = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(user.password, salt));

        case 11:
          user.password = _context.sent;
          return _context.abrupt("return", next());

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", next(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[5, 15]]);
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=User.dev.js.map
