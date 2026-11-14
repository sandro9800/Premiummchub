import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { isAuthenticated, login } from "@/lib/auth";
import { useData } from "@/lib/DataContext";
import { useToast } from "@/components/Toast";

export function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { refresh } = useData();
  const requestedPath = (location.state as { from?: { pathname?: string } } | null)
    ?.from?.pathname;
  const destination = requestedPath?.startsWith("/admin") ? requestedPath : "/admin";

  useEffect(() => {
    if (isAuthenticated()) {
      nav("/admin", { replace: true });
    }
  }, [nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const result = await login(u.trim(), p);
      if (!result.ok) {
        toast.push(result.error || "Invalid credentials.", "error");
        return;
      }

      toast.push("Welcome back, admin.", "success");
      nav(destination, { replace: true });
      void refresh();
    } catch {
      toast.push("Unable to sign in. Please try again.", "error");
    } finally {
      setSubmitting(false);
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
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="label" htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                className="input"
                value={u}
                onChange={(e) => setU(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
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
