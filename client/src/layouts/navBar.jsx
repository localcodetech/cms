// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => { await logout(); navigate("/login"); };

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="font-bold">BlogCMS</Link>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-sm">Hi, {user?.username}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}