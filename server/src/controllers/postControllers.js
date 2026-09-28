// server/src/controllers/posts/postController.js

import {
    blogPostCreateService,
    getPublishedPostsService,
    getPublishedPostByIdService,
    getMyPostsService,
    updateMyPostService,
    deleteMyPostService,
} from "../services//posts/postServices.js";


export const createPostController = async (req, res) => {
    try {
        const post = await blogPostCreateService(req.user.id, req.body);
        res.status(201).json({ message: "post created", data: post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getPublishedPostsController = async (req, res) => {
    try {
        const posts = await getPublishedPostsService();
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





export const getMyPostsController = async (req, res) => {
    try {
        const posts = await getMyPostsService(req.user.id);
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const getPostByIdController = async (req, res) => {
    try {
        const post = await getPublishedPostByIdService(Number(req.params.id));
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};





export const updatePostController = async (req, res) => {
    try {
        const post = await updateMyPostService(req.post.id, req.body);
        res.status(200).json({ message: "post updated", data: post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const deletePostController = async (req, res) => {
    try {
        await deleteMyPostService(req.post.id);
        res.status(200).json({ message: "post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};