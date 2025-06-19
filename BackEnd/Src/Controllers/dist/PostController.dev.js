"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Post = _interopRequireDefault(require("../Model/Post.js"));

var _Comment = _interopRequireDefault(require("../Model/Comment.js"));

var _Shape = _interopRequireDefault(require("../Model/Shape.js"));

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
            _context3.prev = 0;
            userId = req.user._id;
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
            res.json({
              posts: posts
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              error: 'Lỗi khi lấy posts của user'
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  getPostsByUserId: function getPostsByUserId(req, res) {
    var userId, posts;
    return regeneratorRuntime.async(function getPostsByUserId$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.params.userId;
            _context4.next = 4;
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
            posts = _context4.sent;
            res.json({
              posts: posts
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.error("Lỗi khi lấy post của userId:", _context4.t0);
            res.status(500).json({
              error: 'Lỗi khi lấy bài viết của người dùng'
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  createComment: function createComment(req, res) {
    var _req$body2, postId, text, comment, post, populatedComment;

    return regeneratorRuntime.async(function createComment$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, postId = _req$body2.postId, text = _req$body2.text;

            if (text) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              error: 'Text bắt buộc'
            }));

          case 3:
            _context5.prev = 3;
            comment = new _Comment["default"]({
              post: postId,
              author: req.user._id,
              text: text
            });
            _context5.next = 7;
            return regeneratorRuntime.awrap(comment.save());

          case 7:
            _context5.next = 9;
            return regeneratorRuntime.awrap(_Post["default"].findById(postId));

          case 9:
            post = _context5.sent;
            post.comments.push(comment._id);
            _context5.next = 13;
            return regeneratorRuntime.awrap(post.save());

          case 13:
            _context5.next = 15;
            return regeneratorRuntime.awrap(_Comment["default"].findById(comment._id).populate("author", "username avatar"));

          case 15:
            populatedComment = _context5.sent;
            res.status(201).json({
              message: 'Tạo comment thành công',
              comment: populatedComment
            });
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](3);
            console.error(_context5.t0);
            res.status(500).json({
              error: 'Lỗi khi tạo comment'
            });

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[3, 19]]);
  },
  getComments: function getComments(req, res) {
    var postId, comments;
    return regeneratorRuntime.async(function getComments$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            postId = req.params.postId;
            _context6.prev = 1;
            _context6.next = 4;
            return regeneratorRuntime.awrap(_Comment["default"].find({
              post: postId
            }).populate('author', ['username', 'avatar']));

          case 4:
            comments = _context6.sent;
            res.status(200).json(comments);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            console.error("Lỗi khi lấy bình luận:", _context6.t0);
            res.status(500).json({
              message: "Lỗi khi lấy bình luận"
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 8]]);
  },
  DeleteComment: function DeleteComment(req, res) {
    var commentId, comment;
    return regeneratorRuntime.async(function DeleteComment$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            commentId = req.params.commentId;
            _context7.prev = 1;
            _context7.next = 4;
            return regeneratorRuntime.awrap(_Comment["default"].findById(commentId));

          case 4:
            comment = _context7.sent;

            if (comment) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Không tìm thấy bình luận"
            }));

          case 7:
            if (!(comment.author.toString() !== req.user._id.toString())) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(403).json({
              message: "Bạn không có quyền xóa bình luận này"
            }));

          case 9:
            _context7.next = 11;
            return regeneratorRuntime.awrap(_Post["default"].findByIdAndUpdate(comment.post, {
              $pull: {
                comments: comment._id
              }
            }));

          case 11:
            _context7.next = 13;
            return regeneratorRuntime.awrap(_Comment["default"].findByIdAndDelete(commentId));

          case 13:
            res.status(200).json({
              message: "Xóa bình luận thành công"
            });
            _context7.next = 20;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](1);
            console.error("Lỗi khi xoá bình luận:", _context7.t0);
            res.status(500).json({
              message: "Lỗi server khi xoá bình luận"
            });

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 16]]);
  },
  DeletePost: function DeletePost(req, res) {
    var postId, post;
    return regeneratorRuntime.async(function DeletePost$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            postId = req.params.postId;
            _context8.prev = 1;
            _context8.next = 4;
            return regeneratorRuntime.awrap(_Post["default"].findById(postId));

          case 4:
            post = _context8.sent;

            if (post) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              message: "Không tìm thấy bài post"
            }));

          case 7:
            if (!(post.author.toString() !== req.user._id.toString())) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return", res.status(403).json({
              message: "Bạn không có quyền xóa bài viết này"
            }));

          case 9:
            _context8.next = 11;
            return regeneratorRuntime.awrap(_Comment["default"].deleteMany({
              _id: {
                $in: post.comments
              }
            }));

          case 11:
            _context8.next = 13;
            return regeneratorRuntime.awrap(_Post["default"].findByIdAndDelete(postId));

          case 13:
            res.status(200).json({
              message: "Xóa bài viết thành công"
            });
            _context8.next = 20;
            break;

          case 16:
            _context8.prev = 16;
            _context8.t0 = _context8["catch"](1);
            console.error("Lỗi khi xoá bài viết:", _context8.t0);
            res.status(500).json({
              message: "Lỗi server khi xoá bài viết"
            });

          case 20:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[1, 16]]);
  },
  SavedPost: function SavedPost(req, res) {
    var postId, userId, existing, saved;
    return regeneratorRuntime.async(function SavedPost$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            postId = req.body.postId;
            userId = req.user._id;
            _context9.prev = 2;
            _context9.next = 5;
            return regeneratorRuntime.awrap(_Shape["default"].findOne({
              user: userId,
              post: postId
            }));

          case 5:
            existing = _context9.sent;

            if (!existing) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", res.status(400).json({
              message: "Đã lưu trước đó"
            }));

          case 8:
            saved = new _Shape["default"]({
              user: userId,
              post: postId
            });
            _context9.next = 11;
            return regeneratorRuntime.awrap(saved.save());

          case 11:
            res.status(201).json({
              message: "Đã shape bài viết"
            });
            _context9.next = 17;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](2);
            res.status(500).json({
              message: "Lỗi server",
              error: _context9.t0.message
            });

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[2, 14]]);
  },
  GetSavedPost: function GetSavedPost(req, res) {
    var userId, saved;
    return regeneratorRuntime.async(function GetSavedPost$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            userId = req.user._id;
            _context10.next = 4;
            return regeneratorRuntime.awrap(_Shape["default"].find({
              user: userId
            }).populate({
              path: "post",
              populate: {
                path: "author",
                select: "username avatar"
              }
            }));

          case 4:
            saved = _context10.sent;
            res.json(saved);
            _context10.next = 11;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            res.status(500).json({
              message: "Lỗi khi lấy danh sách",
              error: _context10.t0.message
            });

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  deleteSavedPost: function deleteSavedPost(req, res) {
    var postId, userId, saved;
    return regeneratorRuntime.async(function deleteSavedPost$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            postId = req.params.postId;
            userId = req.user._id;
            _context11.prev = 2;
            _context11.next = 5;
            return regeneratorRuntime.awrap(_Shape["default"].findOne({
              user: userId,
              post: postId
            }));

          case 5:
            saved = _context11.sent;

            if (saved) {
              _context11.next = 8;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              message: 'Bài viết chưa được lưu hoặc đã bị xóa'
            }));

          case 8:
            _context11.next = 10;
            return regeneratorRuntime.awrap(_Shape["default"].deleteOne({
              _id: saved._id
            }));

          case 10:
            res.status(200).json({
              message: 'Đã xóa bài viết đã lưu'
            });
            _context11.next = 17;
            break;

          case 13:
            _context11.prev = 13;
            _context11.t0 = _context11["catch"](2);
            console.error('Lỗi khi xóa bài viết đã lưu:', _context11.t0);
            res.status(500).json({
              message: 'Lỗi máy chủ'
            });

          case 17:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[2, 13]]);
  }
};
var _default = PostController;
exports["default"] = _default;
//# sourceMappingURL=PostController.dev.js.map
