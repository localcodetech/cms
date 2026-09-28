import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useAPI";
import { postRegisterData } from "../../api/authcontext";
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
                 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
    >
      {label}
    </label>
    {right}
  </div>
);

const strengthOf = (pw) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
};

const Register = () => {
  const navigate = useNavigate();
  const { execute, loading, error, data } = useApi(postRegisterData);

  const [detail, setDetail] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState(null);

  // id of each input matches the key in state, so one handler is enough
  const formhandler = (e) => {
    const { id, value } = e.target;
    setLocalError(null);
    setDetail((prev) => ({ ...prev, [id]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (detail.password !== detail.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...dataObject } = detail;
    execute(dataObject);
  };

  useEffect(() => {
    if (data) navigate("/login");
  }, [data, navigate]);

  const message = localError || error;
  const strength = strengthOf(detail.password);
  const strengthColors = ["bg-white/10", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070c] px-4 py-10">
      {/* background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        {/* brand panel */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800 p-10 md:flex">
          <div className="text-lg font-bold tracking-tight text-white">BlogCMS</div>
          <div>
            <h2 className="text-4xl font-bold leading-tight text-white">
              Write. Publish.
              <br />
              Own your story.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              Create drafts, publish when you're ready, and manage everything from one clean dashboard.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>✓ Draft and publish workflow</li>
            <li>✓ Your posts, your control</li>
            <li>✓ Secure login with token protection</li>
          </ul>
        </div>

        {/* form panel */}
        <form onSubmit={submitForm} className="flex flex-col gap-4 p-8 sm:p-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Create account</h1>
            <p className="mt-1 text-sm text-white/50">Join in less than a minute.</p>
          </div>

          {message && (
            <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {message}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstname" label="First name" value={detail.firstname} onChange={formhandler} />
            <Field id="lastname" label="Last name" value={detail.lastname} onChange={formhandler} />
          </div>

          <Field id="username" label="Username" value={detail.username} onChange={formhandler} />
          <Field id="email" label="Email" type="email" value={detail.email} onChange={formhandler} />

          <Field
            id="password"
            label="Password"
            type={showPw ? "text" : "password"}
            value={detail.password}
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

          {detail.password && (
            <div className="-mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : "bg-white/10"}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-white/40">{strengthLabels[strength]}</p>
            </div>
          )}

          <Field
            id="confirmPassword"
            label="Confirm password"
            type={showPw ? "text" : "password"}
            value={detail.confirmPassword}
            onChange={formhandler}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-sm font-semibold text-white
                       shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader /> : "Create account"}
          </button>

          <p className="text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-fuchsia-300 hover:text-fuchsia-200 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;