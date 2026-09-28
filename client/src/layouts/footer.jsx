// src/layouts/footer.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { isLoggedIn } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#07070c]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        {/* brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-indigo-500 text-sm font-bold text-white">
              B
            </span>
            <span className="text-lg font-bold tracking-tight text-white">BlogCMS</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Write drafts, publish when you're ready, and manage everything from one clean dashboard.
          </p>
        </div>

        {/* explore */}
        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-white/50 transition hover:text-white">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-white/50 transition hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/new" className="text-white/50 transition hover:text-white">New post</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white/50 transition hover:text-white">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-white/50 transition hover:text-white">Create account</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* built with */}
        <div>
          <h3 className="text-sm font-semibold text-white">Built with</h3>
          <p className="mt-3 text-sm text-white/50">
            React, Express, Sequelize, JWT and Redis.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/40 sm:flex-row">
          <p>© {year} BlogCMS. All rights reserved.</p>
          <p>Made with care, one commit at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;