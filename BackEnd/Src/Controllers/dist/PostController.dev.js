"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Post = _interopRequireDefault(require("../Model/Post.js"));

var _Comment = _interopRequireDefault(require("../Model/Comment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PostController = {
  createPost: function createPost(req, res) {
    var _req$body, image, caption, newPost;

    return regeneratorRuntime.async(function createPost$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, image = _req$body.image, caption = _req$body.caption;

            if (caption) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'Image bắt buộc'
            }));

          case 3:
            _context.prev = 3;
            newPost = new _Post["default"]({
              author: req.user._id,
              image: image,
              caption: caption,
              likes: [],
              comments: []
            });
            _context.next = 7;
            return regeneratorRuntime.awrap(newPost.save());

          case 7:
            res.status(201).json({
              message: 'Tạo post thành công',
              post: newPost
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            res.status(500).json({
              error: 'Lỗi khi tạo post'
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 10]]);
  },
  getAllPosts: function getAllPosts(req, res) {
    var posts;
    return regeneratorRuntime.async(function getAllPosts$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_Post["default"].find().populate('author', 'username avatar').populate({
              path: 'comments',
              populate: {
                path: 'author',
                select: 'username avatar'
              }
            }).sort({
              createdAt: -1
            }));

          case 3:
            posts = _context2.sent;
            res.json(posts);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              error: 'Lỗi khi lấy posts'
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getUserPosts: function getUserPosts(req, res) {
    var userId, posts;
    return regeneratorRuntime.async(function getUserPosts$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.params.userId;
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_Post["default"].find({
              author: userId
            }).populate('author', 'username avatar').populate({
              path: 'comments',
              populate: {
                path: 'author',
                select: 'username avatar'
              }
            }).sort({
              createdAt: -1
            }));

          case 4:
            posts = _context3.sent;
            res.json(posts);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              error: 'Lỗi khi lấy posts của user'
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 8]]);
  },
  createComment: function createComment(req, res) {
    var _req$body2, postId, text, comment, post;

    return regeneratorRuntime.async(function createComment$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, postId = _req$body2.postId, text = _req$body2.text;

            if (text) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              error: 'Text bắt buộc'
            }));

          case 3:
            _context4.prev = 3;
            comment = new _Comment["default"]({
              post: postId,
              author: req.user._id,
              text: text
            });
            _context4.next = 7;
            return regeneratorRuntime.awrap(comment.save());

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(_Post["default"].findById(postId));

          case 9:
            post = _context4.sent;
            post.comments.push(comment._id);
            _context4.next = 13;
            return regeneratorRuntime.awrap(post.save());

          case 13:
            res.status(201).json({
              message: 'Tạo comment thành công',
              comment: comment
            });
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](3);
            res.status(500).json({
              error: 'Lỗi khi tạo comment'
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[3, 16]]);
  }
};
var _default = PostController;
exports["default"] = _default;
//# sourceMappingURL=PostController.dev.js.map
