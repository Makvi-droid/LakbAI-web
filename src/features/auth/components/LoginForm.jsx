import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!form.email) next.email = 'Email is required';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: replace with real auth call, e.g.
    // const res = await api.post('/auth/login', form);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <motion.div variants={fieldVariants} className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">Welcome back</p>
        <h2 className="font-display mt-1.5 text-3xl text-[#12202B]">Sign in to LakbAI</h2>
        <p className="mt-2 text-sm text-[#7C93A3]">Access the admin and staff dashboard.</p>
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
          type={showPassword ? 'text' : 'password'}
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
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} strokeWidth={1.75} /> : <Eye size={17} strokeWidth={1.75} />}
            </button>
          }
        />
      </motion.div>

      <motion.div variants={fieldVariants} className="flex items-center justify-between text-sm">
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

      <motion.p variants={fieldVariants} className="text-center text-xs text-[#7C93A3]">
        For staff and administrator access only.
      </motion.p>
    </motion.form>
  );
}
