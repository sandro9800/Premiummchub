import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, ShieldAlert, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { hasAdminCredentials, isAuthenticated, login } from "@/lib/auth";
import { useToast } from "@/components/Toast";

export function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated()) {
      nav("/admin", { replace: true });
    }
  }, [nav]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const ok = login(u.trim(), p);
    setSubmitting(false);
    if (ok) {
      toast.push("Welcome back, admin.", "success");
      nav("/admin", { replace: true });
    } else {
      toast.push("Invalid credentials.", "error");
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 grid-bg overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="card p-7 shadow-2xl shadow-violet-500/10">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={16} className="text-violet-300" />
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
          </div>
          <p className="text-sm text-slate-400 mb-5">
            Sign in to manage the catalog, media, analytics, and settings.
          </p>
          {!hasAdminCredentials() && (
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                <ShieldAlert size={13} /> Credentials not configured
              </div>
              Set <code className="font-mono">VITE_ADMIN_USERNAME</code> and{" "}
              <code className="font-mono">VITE_ADMIN_PASSWORD</code> in your
              Vercel environment variables, then redeploy.
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="label">Username</label>
              <input
                className="input"
                value={u}
                onChange={(e) => setU(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={p}
                onChange={(e) => setP(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full h-11"
            >
              {submitting ? "Signing in…" : "Sign in"}
              <ArrowRight size={14} />
            </button>
          </form>
          <p className="mt-5 text-center text-xs text-slate-500">
            <Link to="/" className="hover:text-white inline-flex items-center gap-1">
              <KeyRound size={11} /> Back to public site
            </Link>
          </p>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Sessions are kept in this tab only and clear when you close it.
        </p>
      </div>
    </div>
  );
}
