"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateVarietyPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/bacalla";

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "El nom és obligatori.";
    else if (name.trim().length < 2) newErrors.name = "El nom ha de tenir almenys 2 caràcters.";

    if (!origin.trim()) newErrors.origin = "L'origen és obligatori.";
    else if (origin.trim().length < 2) newErrors.origin = "L'origen ha de tenir almenys 2 caràcters.";

    if (!type.trim()) newErrors.type = "El tipus és obligatori (ex: salat, fresc, fumat).";
    else if (type.trim().length < 2) newErrors.type = "El tipus ha de tenir almenys 2 caràcters.";

    if (!description.trim()) newErrors.description = "La descripció és obligatòria.";
    else if (description.trim().length < 5) newErrors.description = "La descripció ha de tenir almenys 5 caràcters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!validate()) return;

    try {
      setLoading(true);
      
      const payload = {
        name: name.trim(),
        origin: origin.trim(),
        type: type.trim().toLowerCase(),
        description: description.trim()
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "S'ha produït un error al desar.");
      }

      setFeedback({
        type: "success",
        message: "S'ha desat la varietat correctament! Redirigint al catàleg..."
      });

      setName("");
      setOrigin("");
      setType("");
      setDescription("");

      setTimeout(() => {
        router.push("/exercici2");
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setFeedback({
        type: "error",
        message: err.message || "Error de connexió amb el backend."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-main font-sans min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container flex-between">
          <Link href="/exercici2" className="nav-logo">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 C25 25, 65 30, 85 50 C75 55, 65 52, 55 48 C45 44, 30 45, 10 50 Z" fill="#006b75" />
              <path d="M10 50 C25 75, 65 70, 85 50" stroke="#006b75" strokeWidth="4" fill="none" />
              <path d="M85 50 L95 40 L90 50 L95 60 Z" fill="#006b75" />
              <circle cx="75" cy="45" r="3" fill="#ffffff" />
            </svg>
            Bacallà API
          </Link>
          
          <div className="nav-links">
            <Link href="/exercici2" className="nav-link">Inici</Link>
            <Link href="/exercici2/nova" className="nav-link active">Nova Varietat</Link>
            <span className="nav-badges">
              <span className="badge badge-express">Express</span>
              <span className="badge badge-nextjs">Next.js</span>
              <span className="badge badge-jsonapi">JSON API</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container flex-grow">
        <div className="form-card">
          <h1 className="form-title">Afegir Nova Varietat</h1>
          <p className="form-subtitle">Envia una sol·licitud POST en JSON al backend d'Express per afegir un nou element de bacallà.</p>

          {feedback && (
            <div className={`alert alert-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nom de la varietat</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Bacallà fumat de Noruega"
                className="form-control"
                disabled={loading}
              />
              {errors.name && <p className="validation-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="origin">Origen o regió</label>
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Ex: Noruega, Atlàntic Nord, Galícia"
                className="form-control"
                disabled={loading}
              />
              {errors.origin && <p className="validation-error">{errors.origin}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="type">Tipus o presentació</label>
              <input
                id="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Ex: fumat, salat, dessalat, fresc"
                className="form-control"
                disabled={loading}
              />
              {errors.type && <p className="validation-error">{errors.type}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Descripció del producte</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escriviu una petita descripció culinària o comercial de la varietat..."
                className="form-control form-textarea"
                disabled={loading}
              />
              {errors.description && <p className="validation-error">{errors.description}</p>}
            </div>

            <div className="form-actions">
              <Link href="/exercici2" className="form-btn-cancel" style={{ textAlign: "center", textDecoration: "none" }}>
                Cancel·lar
              </Link>
              <button
                type="submit"
                className="form-btn-submit"
                disabled={loading}
              >
                {loading ? "Desant dades..." : "Desar Varietat"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 C25 25, 65 30, 85 50 C75 55, 65 52, 55 48 C45 44, 30 45, 10 50 Z" fill="#e2e8f0" />
              <path d="M10 50 C25 75, 65 70, 85 50" stroke="#e2e8f0" strokeWidth="4" fill="none" />
              <path d="M85 50 L95 40 L90 50 L95 60 Z" fill="#e2e8f0" />
            </svg>
            Projecte acadèmic — M0616
          </div>
          <p>© {new Date().getFullYear()} Ciro. Desenvolupament full-stack de Bacallà.</p>
        </div>
      </footer>
    </div>
  );
}
