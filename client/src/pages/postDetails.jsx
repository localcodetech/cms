// src/pages/PostDetail.jsx
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getPublishedPost } from "../api/postApi";
import { useAuth } from "../context/AuthContext";

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : null;

const readTime = (text = "") => `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;

const backLink = "inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-fuchsia-300";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { execute, data, loading, error } = useApi(getPublishedPost);
  useEffect(() => { execute(id); }, [id]); // eslint-disable-line

  const post = data?.data;
  const isOwner = user?.id != null && post?.userId === user.id;
  const date = formatDate(post?.createdAt);

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-600/25 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-12">
          <Link to="/posts" className={backLink}>← All posts</Link>

          {loading && (
            <div className="mt-10 animate-pulse space-y-4">
              <div className="h-10 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-40 rounded bg-white/5" />
              <div className="mt-8 h-72 rounded-3xl bg-white/5" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-white/5" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-5xl">🔍</p>
              <h1 className="mt-4 text-2xl font-bold">Post not found</h1>
              <p className="mt-2 text-sm text-white/50">It may be a draft, or it was removed.</p>
              <Link
                to="/posts"
                className="mt-6 inline-block rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
              >
                Browse posts
              </Link>
            </div>
          )}

          {!loading && post && (
            <article className="mt-10">
              <header>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/40">
                  {date && <span>{date}</span>}
                  {date && <span>·</span>}
                  <span>{readTime(post.content)}</span>
                  {isOwner && (
                    <Link
                      to={`/dashboard/edit/${post.id}`}
                      className="ml-auto rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      Edit post
                    </Link>
                  )}
                </div>
              </header>

              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt=""
                  className="mt-8 max-h-[28rem] w-full rounded-3xl border border-white/10 object-cover"
                />
              ) : (
                <div className="mt-8 h-2 w-24 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
              )}

              <div className="mt-10 whitespace-pre-wrap text-lg leading-8 text-white/75">{post.content}</div>

              <footer className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <h2 className="text-xl font-semibold">Enjoyed this post?</h2>
                <p className="mt-1 text-sm text-white/50">There's more where that came from.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/posts"
                    className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
                  >
                    Read more posts
                  </Link>
                  <Link
                    to={user ? "/dashboard/new" : "/register"}
                    className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    Write your own
                  </Link>
                </div>
              </footer>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
