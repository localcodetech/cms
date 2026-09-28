// src/pages/Posts.jsx  (public feed)
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getPublishedPosts } from "../api/postApi";

export default function Posts() {
  const { execute, data, loading, error } = useApi(getPublishedPosts);
  useEffect(() => { execute(); }, []); // eslint-disable-line

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 grid gap-4">
      {data?.data?.map((p) => (
        <Link key={p.id} to={`/posts/${p.id}`} className="border rounded-xl p-4 hover:shadow">
          {p.coverImage && <img src={p.coverImage} alt="" className="rounded-lg mb-3 max-h-48 w-full object-cover" />}
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p className="text-gray-600 line-clamp-2">{p.content}</p>
        </Link>
      ))}
    </div>
  );
}