import { checkPostOwnership } from "../middleware/checkPostOwnership.js";
import { Router } from "express";

import { getPostByIdController, getMyPostsController,getPublishedPostsController, createPostController,updatePostController,deletePostController } from "../controllers/postControllers.js";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware.js";
import { schemaValidation } from "../middleware/validation.js";
import { createPostSchema, updatePostSchema } from "../schemas/registerSchema.js";

const router = Router();

// public
router.get("/", getPublishedPostsController);

// protected. "/mine" MUST come before "/:id", or Express treats "mine" as an id
router.get("/mine", userAuthMiddleware, getMyPostsController);
router.post("/", userAuthMiddleware, schemaValidation(createPostSchema), createPostController);

// public single post
router.get("/:id", getPostByIdController);

// owner only
router.put("/:id", userAuthMiddleware, checkPostOwnership, schemaValidation(updatePostSchema), updatePostController);
router.delete("/:id", userAuthMiddleware, checkPostOwnership, deletePostController);

export default router;