// server/src/services/posts/postServices.js

import {
    createPost,
    findPostByID,
    findPostByUserId,
    findAllPostByStatus,
    updatePost,
    deletePost,
} from "../../repositories/blogPostRepositories.js";

// userId comes from req.user.id (the token), never from the body
export const blogPostCreateService = async (userId, postData) => {
    return await createPost({ ...postData, userId });
};

// public feed: published posts only
export const getPublishedPostsService = async () => {
    return await findAllPostByStatus("published");
};

// public single post: hide drafts from strangers
export const getPublishedPostByIdService = async (id) => {
    const post = await findPostByID(id);

    if (!post || post.status !== "published") {
        throw new Error("post not found");
    }
    return post;
};

// "My Posts" dashboard: drafts included
export const getMyPostsService = async (userId) => {
    return await findPostByUserId(userId);
};



// ownership was already checked in checkPostOwnership middleware
export const updateMyPostService = async (id, data) => {
    await updatePost(id, data);
    return await findPostByID(id); // update() returns a count, so fetch the fresh post
};




export const deleteMyPostService = async (id) => {
    return await deletePost(id);
};