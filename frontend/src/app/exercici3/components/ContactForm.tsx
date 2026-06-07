"use client";

import React, { useState, startTransition } from "react";
import { submitContactRequest, ContactFormState } from "@/actions/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<ContactFormState | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    startTransition(async () => {
      try {
        const res = await submitContactRequest({}, formData);
        setFeedback(res);
        if (res.success) {
          setName("");
          setEmail("");
          setMessage("");
        }
      } catch (err) {
        console.error(err);
        setFeedback({ error: true, message: "Error al connectar amb el servidor." });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900 max-w-lg mx-auto">
      {feedback?.success && (
        <div className="p-4 mb-6 text-sm rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
          Consulta enviada correctament! Hem desat la petició a PostgreSQL.
        </div>
      )}

      {feedback?.error && feedback?.message && (
        <div className="p-4 mb-6 text-sm rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="contact-name">
            Nom complet
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="Ex: Ciro DAW"
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
          />
          {feedback?.error && feedback?.errors?.name && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{feedback.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="contact-email">
            Correu electrònic
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Ex: ciro@example.com"
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition"
          />
          {feedback?.error && feedback?.errors?.email && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{feedback.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2" htmlFor="contact-message">
            Missatge o Consulta
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            placeholder="Com us podem ajudar..."
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition resize-none"
          />
          {feedback?.error && feedback?.errors?.message && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{feedback.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-500 text-black hover:bg-teal-400 font-bold rounded-xl transition text-sm disabled:opacity-50"
        >
          {loading ? "S'està enviant..." : "Enviar consulta"}
        </button>
      </form>
    </div>
  );
}
