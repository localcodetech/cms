// src/layouts/navBar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
  }`;

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/login");
  };

  const initial = user?.username?.[0]?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070c]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-sm font-bold text-white">
            B
          </span>
          <span className="text-lg font-bold tracking-tight text-white">BlogCMS</span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <Link
                to="/dashboard/new"
                className="ml-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
              >
                + New post
              </Link>
              <div className="ml-3 flex items-center gap-3 border-l border-white/10 pl-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                  {initial}
                </span>
                <span className="text-sm text-white/70">{user?.username}</span>
                <button
                  onClick={onLogout}
                  className="rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <Link
                to="/register"
                className="ml-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 md:hidden" onClick={() => setOpen(false)}>
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/dashboard/new" className={linkClass}>New post</NavLink>
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm text-white/70">Hi, {user?.username}</span>
                <button onClick={onLogout} className="text-sm text-red-300">Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}