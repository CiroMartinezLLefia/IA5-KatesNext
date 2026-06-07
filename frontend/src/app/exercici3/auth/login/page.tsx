"use client";

import React, { useState, startTransition } from "react";
import Link from "next/link";
import { loginWithCredentials, LoginFormState } from "@/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<LoginFormState | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      try {
        const res = await loginWithCredentials({}, formData);
        if (res?.error) {
          setFeedback(res);
          setLoading(false);
        }
      } catch (err) {
        // Redirections throw in Next.js, so we handle it gracefully:
        console.log("Redirecting...");
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center font-sans px-6">
      <div className="w-full max-w-md bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900/80 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link href="/exercici3" className="text-xs uppercase tracking-wider font-bold text-teal-500 hover:text-teal-400">
            ⚙️ Tornar a l'inici
          </Link>
          <h1 className="text-2xl font-black text-white mt-3">Iniciar sessió</h1>
          <p className="text-zinc-500 text-xs mt-1">Accediu al panell d'administració de Backoffice</p>
        </div>

        {feedback?.error && (
          <div className="p-3 mb-5 text-xs rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-center font-medium">
            {feedback.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="login-email">
              Correu electrònic
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="editor@serveis.com o admin@serveis.com"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="login-password">
              Contrasenya
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="password123"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-black hover:bg-teal-400 font-bold rounded-xl transition text-sm mt-4 disabled:opacity-50"
          >
            {loading ? "S'està validant..." : "Entrar al Backoffice"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
          No teniu compte?{" "}
          <Link href="/exercici3/auth/register" className="text-teal-400 hover:text-teal-300 font-semibold">
            Crear compte nou
          </Link>
        </div>
      </div>
    </div>
  );
}
