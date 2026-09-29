// src/pages/MyPosts.jsx  (protected dashboard)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getMyPosts, deletePost } from "../api/postApi";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "../lib/motion";

const primaryBtn =
  "rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110";

const tabs = ["all", "published", "draft"];

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "";

export default function MyPosts() {
  const { user } = useAuth();
  const list = useApi(getMyPosts);
  const del = useApi(deletePost);
  const [tab, setTab] = useState("all");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { list.execute(); }, []); // eslint-disable-line
  // refresh after delete
  useEffect(() => { if (del.data) list.execute(); }, [del.data]); // eslint-disable-line

  const posts = list.data?.data ?? [];
  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };
  const visible = tab === "all" ? posts : posts.filter((p) => p.status === tab);

  const onDelete = (id) => {
    setConfirmId(null);
    setDeletingId(id);
    del.execute(id);
  };

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-white/40">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {user?.username ? `${user.username}'s posts` : "My posts"}
            </h1>
          </div>
          <Link to="/dashboard/new" className={primaryBtn}>+ New post</Link>
        </div>

        {/* stats / filter */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-2xl border p-4 text-left transition ${
                tab === t
                  ? "border-fuchsia-400/40 bg-fuchsia-500/10"
                  : "border-white/10 bg-white/3 hover:bg-white/3"
              }`}
            >
              <p className="text-2xl font-bold">{list.loading && !list.data ? "–" : counts[t]}</p>
              <p className="text-xs capitalize text-white/50">{t === "all" ? "Total" : t}</p>
            </button>
          ))}
        </div>

        {(list.error || del.error) && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <span>{list.error || del.error}</span>
            {list.error && (
              <button onClick={() => list.execute()} className="underline hover:text-red-200">Try again</button>
            )}
          </div>
        )}

        {/* list */}
        <div className="mt-6 grid gap-3">
          {list.loading && !list.data &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
            ))}

          {list.data && visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-sm text-white/40">
                {tab === "all" ? "You haven't written anything yet." : `No ${tab} posts.`}
              </p>
              {tab === "all" && (
                <Link to="/dashboard/new" className={`mt-5 inline-block ${primaryBtn}`}>Write your first post</Link>
              )}
            </div>
          )}

          <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p, i) => {
            const deleting = del.loading && deletingId === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease, delay: Math.min(i, 8) * 0.04 } }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
                className={`flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors hover:border-white/20 ${
                  deleting ? "opacity-50" : ""
                }`}
              >
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="h-14 w-14 rounded-xl object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-linear-to-br from-fuchsia-600/30 to-indigo-600/30" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        p.status === "published" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="text-xs text-white/30">{formatDate(p.updatedAt || p.createdAt)}</span>
                  </div>
                  {p.status === "published" ? (
                    <Link to={`/posts/${p.id}`} className="mt-1 block truncate font-semibold hover:text-fuchsia-300">
                      {p.title}
                    </Link>
                  ) : (
                    <p className="mt-1 truncate font-semibold">{p.title}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {confirmId === p.id ? (
                    <>
                      <span className="text-xs text-white/50">Delete?</span>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-lg px-3 py-1.5 text-xs text-white/60 hover:bg-white/5"
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/dashboard/edit/${p.id}`}
                        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/5"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setConfirmId(p.id)}
                        disabled={del.loading}
                        className="rounded-lg px-3 py-1.5 text-xs text-white/50 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-40"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
