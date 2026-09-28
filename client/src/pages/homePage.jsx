// src/pages/homePage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useAPI";
import { getPublishedPosts } from "../api/postApi";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: "✍️", title: "Draft first", text: "Write at your own pace. Nothing goes public until you publish it." },
  { icon: "🔒", title: "Secure by design", text: "Token-based login, hashed passwords and logout that really revokes access." },
  { icon: "⚡", title: "Fast dashboard", text: "Create, edit and delete your posts from one clean place." },
];

const primaryBtn =
  "rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110";
const ghostBtn =
  "rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white";

function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const { execute, data, loading } = useApi(getPublishedPosts);

  useEffect(() => {
    execute();
  }, []); // eslint-disable-line

  const latest = data?.data?.slice(0, 3) ?? [];

  return (
    <div className="bg-[#07070c] text-white">
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-600/30 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/60">
            {isLoggedIn ? `Welcome back, ${user?.username}` : "A simple home for your writing"}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Write. Publish.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Own your story.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/60">
            Create drafts, publish when you're ready, and manage every post from one clean dashboard.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard/new" className={primaryBtn}>Write a post</Link>
                <Link to="/dashboard" className={ghostBtn}>Go to dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/register" className={primaryBtn}>Get started free</Link>
                <Link to="/login" className={ghostBtn}>Sign in</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-fuchsia-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/50">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* latest posts */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest posts</h2>
          <Link to="/posts" className="text-sm text-fuchsia-300 hover:underline">View all →</Link>
        </div>

        {loading && <p className="text-white/50">Loading...</p>}

        {!loading && latest.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">
            No published posts yet. Be the first to write one.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.id}
              to={`/posts/${p.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-fuchsia-400/30"
            >
              {p.coverImage ? (
                <img src={p.coverImage} alt="" className="h-40 w-full object-cover transition group-hover:scale-[1.02]" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-fuchsia-600/30 to-indigo-600/30" />
              )}
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-fuchsia-300">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/50">{p.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* bottom call to action */}
      {!isLoggedIn && (
        <section className="mx-auto max-w-4xl px-4 pb-24">
          <div className="rounded-3xl bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800 p-10 text-center">
            <h2 className="text-3xl font-bold">Ready to start writing?</h2>
            <p className="mt-2 text-sm text-white/70">Create your account in under a minute.</p>
            <Link
              to="/register"
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-800 transition hover:bg-white/90"
            >
              Create account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;