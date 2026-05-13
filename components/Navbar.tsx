"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-farm-500 text-slate-950">
            AF
          </span>
          <span>Adro FarmLab</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-300">
          <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-slate-800/80 hover:text-white">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="rounded-full px-4 py-2 transition hover:bg-slate-800/80 hover:text-white">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full bg-farm-500 px-4 py-2 text-slate-950 transition hover:bg-farm-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-farm-500 px-4 py-2 text-slate-950 transition hover:bg-farm-400">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
