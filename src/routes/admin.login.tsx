import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { DEMO_EMAIL, DEMO_PASSWORD, isSignedIn, signIn } from "@/lib/admin-auth";
import { images } from "@/data/images";

const TITLE = "Admin Login | Shri Krishna Kitchen And Interior";
const DESC = "Demo admin sign-in for managing the Shri Krishna Kitchen And Interior website content.";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSignedIn()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (signIn(email, password)) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid demo credentials. Use the details shown below.");
    }
  }

  const field =
    "mt-2 w-full border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-brass";

  return (
    <div className="grid min-h-screen font-sans lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={images.project02b}
          alt="Premium kitchen detail"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-x-0 bottom-0 p-14">
          <p className="font-display text-3xl text-background">Shri Krishna Kitchen And Interior</p>
          <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-brass">
            Content Management · Demo
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-ivory px-6 py-20">
        <div className="w-full max-w-md">
          <Link to="/" className="text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-brass">
            ← Back to website
          </Link>
          <h1 className="mt-8 font-display text-4xl">Admin Login</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Frontend-only demo authentication. No database, no real accounts.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <label className="block">
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
                placeholder="admin@shrikrishnakitchen.com"
              />
            </label>
            <label className="block">
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                placeholder="••••••••"
              />
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              type="submit"
              className="w-full bg-charcoal py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 border border-border bg-background p-6 text-sm">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">Demo credentials</p>
            <p className="mt-3">{DEMO_EMAIL}</p>
            <p className="text-muted-foreground">{DEMO_PASSWORD}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
