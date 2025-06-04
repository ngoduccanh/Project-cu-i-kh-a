"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../Model/User.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _uuid = require("uuid");

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersController = {
  register: function register(req, res) {
    var _req$body, email, password, FindEmail, newAccont;

    return regeneratorRuntime.async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (!(!email || !password)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'Email và password là bắt buộc'
            }));

          case 3:
            _context.next = 5;
            return regeneratorRuntime.awrap(_User["default"].findOne({
              email: email
            }));

          case 5:
            FindEmail = _context.sent;

            if (!FindEmail) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Email đã tồn tại'
            }));

          case 8:
            newAccont = new _User["default"]({
              email: email,
              password: password
            });
            _context.next = 11;
            return regeneratorRuntime.awrap(newAccont.save());

          case 11:
            return _context.abrupt("return", res.status(200).json({
              message: 'Đăng kí thành công.',
              newAccont: newAccont
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  login: function login(req, res) {
    var _req$body2, email, password, user, checkPassword, randomString, apiKey;

    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (!(!email || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: 'Email và password là bắt buộc'
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return regeneratorRuntime.awrap(_User["default"].findOne({
              email: email
            }));

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: 'Email không tồn tại.'
            }));

          case 9:
            _context2.next = 11;
            return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

          case 11:
            checkPassword = _context2.sent;

            if (checkPassword) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              error: 'Sai mật khẩu.'
            }));

          case 14:
            randomString = (0, _crypto.randomBytes)(16).toString('hex');
            apiKey = "mern-".concat(user.id, "-").concat(user.email, "-").concat(randomString);
            return _context2.abrupt("return", res.status(200).json({
              message: 'Đăng nhập thành công.',
              user: user,
              apiKey: apiKey
            }));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              error: 'Lỗi hệ thống'
            }));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 19]]);
  },
  CreatUser: function CreatUser(req, res) {
    var _req$body3, username, avatar, bio, age, gender, newUser;

    return regeneratorRuntime.async(function CreatUser$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, username = _req$body3.username, avatar = _req$body3.avatar, bio = _req$body3.bio, age = _req$body3.age, gender = _req$body3.gender;

            if (username) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: 'username không được để trống '
            }));

          case 3:
            _context3.prev = 3;
            newUser = new _User["default"]({
              username: username,
              age: age,
              gender: gender,
              avatar: avatar,
              bio: bio
            });
            _context3.next = 7;
            return regeneratorRuntime.awrap(newUser.save());

          case 7:
            res.status(201).json({
              message: "Tạo mới User thành công",
              user: {
                id: (0, _uuid.v4)(),
                username: newUser.username
              }
            });
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              error: " Lỗi hệ thống"
            }));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[3, 10]]);
  },
  UserInfor: function UserInfor(req, res) {
    var user, profileCreated;
    return regeneratorRuntime.async(function UserInfor$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = req.user;

            if (user) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Không tìm thấy người dùng"
            }));

          case 4:
            profileCreated = user.username && user.age;
            res.json({
              profileCreated: !!profileCreated,
              user: {
                username: user.username,
                avatar: user.avatar,
                age: user.age,
                gender: user.gender,
                bio: user.bio
              }
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.status(500).json({
              error: "Lỗi khi lấy thông tin user"
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  UpdateUser: function UpdateUser(req, res) {
    var _req$body4, username, avatar, bio, age, gender, userId, user;

    return regeneratorRuntime.async(function UpdateUser$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body4 = req.body, username = _req$body4.username, avatar = _req$body4.avatar, bio = _req$body4.bio, age = _req$body4.age, gender = _req$body4.gender;
            userId = req.params.userId;

            if (!username) {
              res.status(400).json({
                message: "username không được để trống"
              });
            }

            _context5.prev = 3;
            _context5.next = 6;
            return regeneratorRuntime.awrap(_User["default"].findById(userId));

          case 6:
            user = _context5.sent;

            if (user) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "User không tồn tại"
            }));

          case 9:
            user.username = username;
            if (age) user.age = age;
            if (gender) user.gender = gender;
            if (avatar) user.avatar = avatar;
            if (bio) user.bio = bio;
            _context5.next = 16;
            return regeneratorRuntime.awrap(user.save());

          case 16:
            res.status(200).json({
              message: 'Cập nhật user thành công',
              user: {
                id: user._id,
                username: user.username
              }
            });
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](3);
            console.error(_context5.t0);
            res.status(500).json({
              error: 'Lỗi hệ thống'
            });

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[3, 19]]);
  }
};
var _default = usersController;
exports["default"] = _default;
//# sourceMappingURL=UserController.dev.js.map
