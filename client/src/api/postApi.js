// src/api/postApi.js
import http from "./http";

export const getPublishedPosts = async () => (await http.get("/posts")).data;
export const getPublishedPost = async (id) => (await http.get(`/posts/${id}`)).data;
export const getMyPosts = async () => (await http.get("/posts/mine")).data;
export const createPost = async (body) => (await http.post("/posts", body)).data;
export const updatePost = async ({ id, ...body }) => (await http.put(`/posts/${id}`, body)).data;
export const deletePost = async (id) => (await http.delete(`/posts/${id}`)).data;
export const logoutRequest = async () => (await http.post("/auth/logout")).data;