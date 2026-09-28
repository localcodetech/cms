// src/pages/MyPosts.jsx  (protected dashboard)
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getMyPosts, deletePost } from "../api/postApi";

export default function MyPosts() {
  const list = useApi(getMyPosts);
  const del = useApi(deletePost);

  useEffect(() => { list.execute(); }, []); // eslint-disable-line
  useEffect(() => { if (del.data) list.execute(); }, [del.data]); // refresh after delete // eslint-disable-line

  const onDelete = (id) => {
    if (window.confirm("Delete this post?")) del.execute(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link to="/dashboard/new" className="bg-black text-white px-4 py-2 rounded-lg">New post</Link>
      </div>
      {list.loading && <p>Loading...</p>}
      {(list.error || del.error) && <p className="text-red-600">{list.error || del.error}</p>}
      <div className="grid gap-3">
        {list.data?.data?.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{p.title}</h2>
              <span className={`text-xs px-2 py-1 rounded ${p.status === "published" ? "bg-green-100" : "bg-yellow-100"}`}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-3">
              <Link to={`/dashboard/edit/${p.id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => onDelete(p.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}