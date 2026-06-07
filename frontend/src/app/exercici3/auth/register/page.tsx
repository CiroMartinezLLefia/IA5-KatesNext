"use client";

import React, { useState, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, RegisterFormState } from "@/actions/register";

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<RegisterFormState | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    startTransition(async () => {
      try {
        const res = await registerUser({}, formData);
        setFeedback(res);
        setLoading(false);
        
        if (res.success) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push("/exercici3/auth/login");
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        setFeedback({ error: true, message: "Error de connexió." });
        setLoading(false);
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
          <h1 className="text-2xl font-black text-white mt-3">Crear compte</h1>
          <p className="text-zinc-500 text-xs mt-1">Registreu un compte per accedir al portal públic</p>
        </div>

        {feedback?.success && (
          <div className="p-3 mb-5 text-xs rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 text-center font-medium">
            Usuari registrat correctament! Redirigint al formulari d'accés...
          </div>
        )}

        {feedback?.error && feedback?.message && (
          <div className="p-3 mb-5 text-xs rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-center font-medium">
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="reg-name">
              Nom complet
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="Ex: Joan Client"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
            {feedback?.error && feedback?.errors?.name && (
              <p className="text-red-500 text-xs mt-1 font-medium">{feedback.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="reg-email">
              Correu electrònic
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Ex: joan@gmail.com"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
            {feedback?.error && feedback?.errors?.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{feedback.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="reg-password">
              Contrasenya (mínim 6)
            </label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
            {feedback?.error && feedback?.errors?.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">{feedback.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="reg-conf-password">
              Confirmar contrasenya
            </label>
            <input
              id="reg-conf-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
            />
            {feedback?.error && feedback?.errors?.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">{feedback.errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-black hover:bg-teal-400 font-bold rounded-xl transition text-sm mt-4 disabled:opacity-50"
          >
            {loading ? "S'està creant..." : "Registrar compte"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
          Ja teniu compte?{" "}
          <Link href="/exercici3/auth/login" className="text-teal-400 hover:text-teal-300 font-semibold">
            Inicia sessió
          </Link>
        </div>
      </div>
    </div>
  );
}
