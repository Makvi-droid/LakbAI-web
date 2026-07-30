import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../hooks/useAuth";

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginForm() {
  // Renamed the auth context's `loading` to `authLoading` — it was
  // shadowing the local submit-button `loading` state below, which
  // meant the button's spinner prop was silently reading the wrong value.
  const { login, user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  // Redirect reactively once the auth context is fully settled, instead of
  // navigating immediately after the login() promise resolves. login()
  // only waits for Supabase's signInWithPassword call — it does NOT wait
  // for the employee profile (and therefore the role) to be fetched, which
  // happens asynchronously via the auth state listener. Navigating right
  // after await login() could land on a role-gated route (/admin, /staff)
  // before the role was known yet, causing a bounce through /unauthorized.
  //
  // AuthProvider guarantees there's never a frame where `user` is set,
  // `loading` is false, and `role` is still unresolved — so gating on
  // `!authLoading && user` here is safe and race-free.
  useEffect(() => {
    if (authLoading || !user) return;

    if (!role) {
      // Signed in, but no matching employee record / role was found.
      setAuthError("This account has no staff or admin role assigned.");
      return;
    }

    // The role's own dashboard is always a safe redirect target.
    const fallback = role === "admin" ? "/admin" : "/staff";

    // `location.state.from` can be left over from an ENTIRELY UNRELATED
    // prior navigation — most commonly: a different user was previously
    // logged in, got logged out from e.g. /admin, ProtectedRoute bounced
    // them to /login with state.from.pathname = "/admin", and now A
    // DIFFERENT account (say, a staff account) is signing in on that same
    // /login page. That leftover "/admin" has nothing to do with this new
    // user's role and must not be trusted blindly.
    //
    // Only honor `from` if it's actually inside the section this role is
    // allowed to access — otherwise send them to their own dashboard.
    const fromPath = location.state?.from?.pathname;
    const fromIsSameSection = fromPath && fromPath.startsWith(fallback);
    const redirectTo = fromIsSameSection ? fromPath : fallback;

    navigate(redirectTo, { replace: true });
  }, [authLoading, user, role, location.state, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setAuthError("");
  };

  const validate = () => {
    const next = {};
    if (!form.email) next.email = "Email is required";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAuthError("");
    try {
      // Just sign in here. The redirect itself is handled by the effect
      // above once `user` + `role` are both confirmed ready — this avoids
      // racing a manual navigate() against the async role fetch.
      await login(form.email, form.password);
    } catch (err) {
      setAuthError(
        err.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <motion.div variants={fieldVariants} className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Welcome back
        </p>
        <h2 className="font-display mt-1.5 text-3xl text-[#12202B]">
          Sign in to LakbAI
        </h2>
        <p className="mt-2 text-sm text-[#7C93A3]">
          Access the admin and staff dashboard.
        </p>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <Input
          label="Email address"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@lakbai.ph"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
      </motion.div>

      <motion.div variants={fieldVariants}>
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-[#7C93A3] transition-colors hover:text-[#12202B]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={17} strokeWidth={1.75} />
              ) : (
                <Eye size={17} strokeWidth={1.75} />
              )}
            </button>
          }
        />
      </motion.div>

      {authError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-500"
        >
          {authError}
        </motion.p>
      )}

      <motion.div
        variants={fieldVariants}
        className="flex items-center justify-between text-sm"
      >
        <label className="flex items-center gap-2 text-[#7C93A3]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-black/20 text-[#14B8A6] focus:ring-[#14B8A6]"
          />
          Remember me
        </label>
        <a href="#" className="font-medium text-[#0D9488] hover:underline">
          Forgot password?
        </a>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <Button type="submit" loading={loading}>
          Sign in <ArrowRight size={16} />
        </Button>
      </motion.div>

      <motion.p
        variants={fieldVariants}
        className="text-center text-xs text-[#7C93A3]"
      >
        For staff and administrator access only.
      </motion.p>
    </motion.form>
  );
}
