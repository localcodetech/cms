// src/pages/PostDetail.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getPublishedPost } from "../api/postApi";

export default function PostDetail() {
  const { id } = useParams();
  const { execute, data, loading, error } = useApi(getPublishedPost);
  useEffect(() => { execute(id); }, [id]); // eslint-disable-line

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  const post = data?.data;
  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto p-6">
      {post.coverImage && <img src={post.coverImage} alt="" className="rounded-xl mb-4 w-full" />}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </article>
  );
}