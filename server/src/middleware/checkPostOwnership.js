// src/middleware/checkPostOwnership.js
import { findPostByID } from "../repositories/blogPostRepositories.js";

export const checkPostOwnership = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "invalid post id" });
        }

        const post = await findPostByID(id);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "forbidden" });
        }

        req.post = post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};