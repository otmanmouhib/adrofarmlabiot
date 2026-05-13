"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
          <p className="mt-3 text-slate-300">Secure access to the Adro FarmLab IoT dashboard.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-farm-400 focus:ring-2 focus:ring-farm-400/30"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-farm-400 focus:ring-2 focus:ring-farm-400/30"
              placeholder="Enter your password"
            />
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-2xl bg-farm-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-farm-400 focus:outline-none focus:ring-2 focus:ring-farm-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Back to <Link href="/" className="text-farm-300 hover:text-farm-100">home</Link>.
        </p>
      </div>
    </div>
  );
}
