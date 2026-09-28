// src/pages/PostEditor.jsx  (create + edit)
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { createPost, updatePost, getMyPosts } from "../api/postApi";

export default function PostEditor() {
  const { id } = useParams();            // present when editing
  const navigate = useNavigate();
  const save = useApi(id ? updatePost : createPost);
  const mine = useApi(getMyPosts);       // drafts aren't public, so edit loads from /mine

  const [form, setForm] = useState({ title: "", content: "", status: "draft", coverImage: "" });

  useEffect(() => { if (id) mine.execute(); }, [id]); // eslint-disable-line

  useEffect(() => {
    const post = mine.data?.data?.find((p) => String(p.id) === id);
    if (post) {
      setForm({ title: post.title, content: post.content, status: post.status, coverImage: post.coverImage || "" });
    }
  }, [mine.data, id]);

  useEffect(() => { if (save.data) navigate("/dashboard"); }, [save.data, navigate]);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const body = { ...form };
    if (!body.coverImage) delete body.coverImage; // empty string would fail z.url()
    save.execute(id ? { id, ...body } : body);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-6 grid gap-4">
      <h1 className="text-2xl font-bold">{id ? "Edit post" : "New post"}</h1>
      {save.error && <p className="text-red-600">{save.error}</p>}
      <input name="title" value={form.title} onChange={onChange} placeholder="Title" required minLength={3} maxLength={255} className="border rounded-lg p-3" />
      <textarea name="content" value={form.content} onChange={onChange} placeholder="Content (min 10 chars)" required minLength={10} rows={10} className="border rounded-lg p-3" />
      <input name="coverImage" value={form.coverImage} onChange={onChange} placeholder="Cover image URL (optional)" className="border rounded-lg p-3" />
      <select name="status" value={form.status} onChange={onChange} className="border rounded-lg p-3">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button disabled={save.loading} className="bg-black text-white rounded-lg p-3">
        {save.loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}