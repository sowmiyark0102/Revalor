"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pine">
            <span className="h-2.5 w-2.5 rounded-sm bg-copper" />
          </span>
          <span className="font-display text-lg font-semibold">Revalor</span>
        </div>

        <Card>
          <div className="mb-5 flex rounded-lg bg-paper-alt p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white shadow-sm" : "text-muted"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "signup" ? "bg-white shadow-sm" : "text-muted"
              }`}
            >
              Sign up
            </button>
          </div>

          <form className="space-y-4" action="/dashboard">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium">Full name</label>
                <input
                  required
                  className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
              />
            </div>
            <Button href="/dashboard" className="w-full">
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button href="/dashboard" variant="secondary" className="w-full">
            Continue with Google
          </Button>
        </Card>

        <p className="mt-6 text-center text-xs text-muted">
          By continuing you agree to Revalor's Terms and Privacy Policy.{" "}
          <Link href="/" className="underline">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
