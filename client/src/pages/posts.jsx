// src/pages/Posts.jsx  (public feed)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getPublishedPosts } from "../api/postApi";
import { motion } from "framer-motion";
import { fadeUp, lift, stagger } from "../lib/motion";

const MotionLink = motion.create(Link);

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : null;

const readTime = (text = "") => `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;

function Cover({ src, className }) {
  return src ? (
    <img src={src} alt="" className={`w-full object-cover transition duration-300 group-hover:scale-[1.03] ${className}`} />
  ) : (
    <div className={`w-full bg-linear-to-br from-fuchsia-600/30 to-indigo-600/30 ${className}`} />
  );
}

function Meta({ post }) {
  const date = formatDate(post.createdAt);
  return (
    <p className="text-xs text-white/40">
      {date && <>{date} · </>}
      {readTime(post.content)}
    </p>
  );
}

export default function Posts() {
  const { execute, data, loading, error } = useApi(getPublishedPosts);
  const [query, setQuery] = useState("");

  useEffect(() => { execute(); }, []); // eslint-disable-line

  const posts = (data?.data ?? []).filter((p) =>
    `${p.title} ${p.content}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      {/* header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-600/30 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-20 text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/60">
            The blog
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Stories from{" "}
            <span className="bg-linear-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              our writers
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">Browse every published post, newest ideas first.</p>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="mx-auto mt-8 block w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-fuchsia-400/50 focus:bg-white/[0.07]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        {loading && (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/3">
                <div className="h-40 bg-white/5" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/5" />
                  <div className="h-3 w-5/6 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-300">
            {error}
            <button onClick={() => execute()} className="ml-3 underline hover:text-red-200">Try again</button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">
            {query ? `No posts match "${query}".` : "No published posts yet. Be the first to write one."}
          </div>
        )}

        {/* featured post */}
        {!loading && featured && (
          <MotionLink
            key={`featured-${featured.id}`}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            to={`/posts/${featured.id}`}
            className="group mb-6 grid overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition-colors hover:border-fuchsia-400/30 md:grid-cols-2"
          >
            <div className="overflow-hidden">
              <Cover src={featured.coverImage} className="h-56 md:h-full md:min-h-72" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
              <span className="w-fit rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-medium text-fuchsia-300">
                Featured
              </span>
              <h2 className="text-2xl font-bold tracking-tight group-hover:text-fuchsia-300 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="line-clamp-3 text-white/50">{featured.content}</p>
              <Meta post={featured} />
              <span className="text-sm text-fuchsia-300">Read post →</span>
            </div>
          </MotionLink>
        )}

        {/* the rest */}
        {!loading && rest.length > 0 && (
          <motion.div
            key={query}
            variants={stagger(0.06, 0.1)}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            {rest.map((p) => (
              <MotionLink
                variants={fadeUp}
                whileHover={lift}
                key={p.id}
                to={`/posts/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-colors hover:border-fuchsia-400/30"
              >
                <div className="overflow-hidden">
                  <Cover src={p.coverImage} className="h-40" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-semibold group-hover:text-fuchsia-300">{p.title}</h3>
                  <p className="line-clamp-2 flex-1 text-sm text-white/50">{p.content}</p>
                  <Meta post={p} />
                </div>
              </MotionLink>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
