"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _PostController = _interopRequireDefault(require("../Controllers/PostController.js"));

var _CheckUser = _interopRequireDefault(require("../Middleware/CheckUser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postRouter = _express["default"].Router();

exports.postRouter = postRouter;
postRouter.post("/Createpost", _CheckUser["default"], _PostController["default"].createPost);
postRouter.get("/", _PostController["default"].getAllPosts);
postRouter.get("/user", _CheckUser["default"], _PostController["default"].getUserPosts);
postRouter.get("/user/:userId", _PostController["default"].getPostsByUserId);
postRouter.get("/:postId/comments", _PostController["default"].getComments);
postRouter.post("/comment", _CheckUser["default"], _PostController["default"].createComment);
postRouter["delete"]("/comments/:commentId", _CheckUser["default"], _PostController["default"].DeleteComment);
postRouter["delete"]("/:postId", _CheckUser["default"], _PostController["default"].DeletePost);
postRouter.post("/saved", _CheckUser["default"], _PostController["default"].SavedPost);
postRouter.get("/saved", _CheckUser["default"], _PostController["default"].GetSavedPost);
postRouter["delete"]("/saved/:postId", _CheckUser["default"], _PostController["default"].deleteSavedPost);
//# sourceMappingURL=postRoutes.dev.js.map
