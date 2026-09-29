// src/components/ui/signin.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useAPI";
import { postLoginUser } from "../../api/authcontext";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/loading";

const Field = ({ id, label, type = "text", value, onChange, right }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      placeholder=" "
      className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2 pt-6 text-sm text-white outline-none transition
                 focus:border-fuchsia-400/70 focus:bg-white/10 focus:ring-4 focus:ring-fuchsia-500/10"
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-white/40 transition-all
                 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-fuchsia-300
                 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[11px]"
    >
      {label}
    </label>
    {right}
  </div>
);

const SignIN = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { execute, loading, error, data } = useApi(postLoginUser);

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);

  // input ids match the state keys, so one handler covers both fields
  const formhandler = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    execute(userData);
  };

  // the only effect: save { user, token }, then redirect
  useEffect(() => {
    if (data) {
      login(data.data);
      navigate("/dashboard");
    }
  }, [data, navigate, login]);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#07070c] px-4 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-[120px]" />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        {/* brand panel */}
        <div className="hidden flex-col justify-between bg-linear-to-br from-indigo-700 via-purple-700 to-fuchsia-600 p-10 md:flex">
          <div className="text-lg font-bold tracking-tight text-white">
            BlogCMS
          </div>
          <div>
            <h2 className="text-4xl font-bold leading-tight text-white">
              Welcome
              <br />
              back.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              Pick up where you left off. Your drafts are waiting.
            </p>
          </div>
          <p className="text-xs text-white/50">
            Secure sign-in with token protection.
          </p>
        </div>

        {/* form panel */}
        <form onSubmit={submitForm} className="flex flex-col gap-4 p-8 sm:p-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Sign in
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Enter your details to continue.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <Field
            id="email"
            label="Email"
            type="email"
            value={userData.email}
            onChange={formhandler}
          />

          <Field
            id="password"
            label="Password"
            type={showPw ? "text" : "password"}
            value={userData.password}
            onChange={formhandler}
            right={
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-4 top-4 text-xs font-medium text-white/40 hover:text-white"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 items-center justify-center rounded-xl bg-linear-to-r from-fuchsia-500 to-indigo-500 text-sm font-semibold text-white
                       shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader /> : "Sign in"}
          </button>

          <p className="text-center text-sm text-white/50">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-fuchsia-300 hover:text-fuchsia-200 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIN;
