"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coffee, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Login failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-4">
      {/* subtle grain overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_8px)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <span className="h-14 w-14 rounded-2xl bg-brass/20 flex items-center justify-center mb-4">
            <Coffee className="h-7 w-7 text-brass-light" strokeWidth={1.5} />
          </span>
          <h1 className="font-display text-2xl text-paper">cFlow Cafe</h1>
          <p className="text-paper/50 text-sm mt-1 font-mono">Admin Portal</p>
        </div>

        <div className="rounded-3xl bg-paper/5 border border-paper/10 p-8 backdrop-blur-sm">
          <h2 className="font-display text-xl text-paper mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-paper/40">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full rounded-xl border border-paper/10 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus-visible:border-brass outline-none transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-paper/40">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-paper/10 bg-paper/5 px-4 py-3 pr-12 text-sm text-paper placeholder:text-paper/30 focus-visible:border-brass outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-paper/40 hover:text-paper/70"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-ember bg-ember/10 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              size="lg"
              variant="brass"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        {/* Demo hint */}
        <p className="mt-5 text-center text-xs text-paper/30 font-mono">
          Demo credentials — username: <span className="text-paper/50">admin</span> &nbsp;/&nbsp; password: <span className="text-paper/50">admin123</span>
        </p>
      </motion.div>
    </div>
  );
}
