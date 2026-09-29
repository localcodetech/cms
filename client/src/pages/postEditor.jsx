// src/pages/PostEditor.jsx  (create + edit)
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { createPost, updatePost, getMyPosts } from "../api/postApi";
import { AnimatePresence, motion } from "framer-motion";

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-fuchsia-400/50 focus:bg-white/[0.07]";
const label = "mb-2 block text-xs font-medium uppercase tracking-wide text-white/50";

export default function PostEditor() {
  const { id } = useParams();            // present when editing
  const navigate = useNavigate();
  const save = useApi(id ? updatePost : createPost);
  const mine = useApi(getMyPosts);       // drafts aren't public, so edit loads from /mine

  const [form, setForm] = useState({ title: "", content: "", status: "draft", coverImage: "" });
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => { if (id) mine.execute(); }, [id]); // eslint-disable-line

  const existing = mine.data?.data?.find((p) => String(p.id) === id);
  const notFound = id && mine.data && !existing;

  // fill the form once when the post arrives (state adjusted during render, no effect needed)
  const [loadedId, setLoadedId] = useState(null);
  if (existing && loadedId !== existing.id) {
    setLoadedId(existing.id);
    setForm({
      title: existing.title,
      content: existing.content,
      status: existing.status,
      coverImage: existing.coverImage || "",
    });
  }

  useEffect(() => { if (save.data) navigate("/dashboard"); }, [save.data, navigate]);

  const onChange = (e) => {
    if (e.target.name === "coverImage") setImgBroken(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = { ...form };
    if (!body.coverImage) delete body.coverImage; // empty string would fail z.url()
    save.execute(id ? { id, ...body } : body);
  };

  const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 py-12">
          <Link to="/dashboard" className="text-sm text-white/50 transition hover:text-fuchsia-300">← Dashboard</Link>

          {id && mine.loading && !mine.data && (
            <div className="mt-8 animate-pulse space-y-4">
              <div className="h-8 w-48 rounded bg-white/10" />
              <div className="h-12 rounded-xl bg-white/5" />
              <div className="h-64 rounded-xl bg-white/5" />
            </div>
          )}

          {(notFound || (id && mine.error)) && (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/3 p-10 text-center">
              <h1 className="text-2xl font-bold">Post not found</h1>
              <p className="mt-2 text-sm text-white/50">
                {mine.error || "It doesn't exist, or it isn't yours to edit."}
              </p>
              <Link to="/dashboard" className="mt-6 inline-block text-sm text-fuchsia-300 hover:underline">
                Back to dashboard
              </Link>
            </div>
          )}

          {(!id || existing) && (
            <form onSubmit={onSubmit} className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">{id ? "Edit post" : "New post"}</h1>

                {/* status toggle */}
                <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 text-sm">
                  {["draft", "published"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                      className={`rounded-lg px-4 py-1.5 capitalize transition ${
                        form.status === s
                          ? s === "published"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-amber-500/20 text-amber-300"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {save.error && (
                <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  {save.error}
                </div>
              )}

              <div className="mt-6 grid gap-6 rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
                <div>
                  <label htmlFor="title" className={label}>Title</label>
                  <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    placeholder="Give your post a title"
                    required
                    minLength={3}
                    maxLength={255}
                    className={`${field} text-lg font-semibold`}
                  />
                </div>

                <div>
                  <label htmlFor="coverImage" className={label}>Cover image URL (optional)</label>
                  <input
                    id="coverImage"
                    name="coverImage"
                    type="url"
                    value={form.coverImage}
                    onChange={onChange}
                    placeholder="https://..."
                    className={field}
                  />
                  <AnimatePresence>
                  {form.coverImage && !imgBroken && (
                    <motion.img
                      key={form.coverImage}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      src={form.coverImage}
                      alt=""
                      onError={() => setImgBroken(true)}
                      className="mt-3 max-h-56 w-full rounded-xl border border-white/10 object-cover"
                    />
                  )}
                  </AnimatePresence>
                  {form.coverImage && imgBroken && (
                    <p className="mt-2 text-xs text-amber-300/80">Couldn't load a preview for this URL.</p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="content" className={`${label} mb-0`}>Content</label>
                    <span className="text-xs text-white/30">{words} words</span>
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    value={form.content}
                    onChange={onChange}
                    placeholder="Write your story... (min 10 characters)"
                    required
                    minLength={10}
                    rows={6}
                    className={`${field} max-h-96 resize-y leading-6`}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <Link
                  to="/dashboard"
                  className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </Link>
                <button
                  disabled={save.loading}
                  className="rounded-xl bg-linear-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 disabled:opacity-50"
                >
                  {save.loading ? "Saving..." : form.status === "published" ? "Publish" : "Save draft"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
