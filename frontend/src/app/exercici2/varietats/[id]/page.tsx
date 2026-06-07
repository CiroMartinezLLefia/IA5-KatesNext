"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CodIllustration from "../../components/CodIllustration";

interface BacallaItem {
  id: string;
  name: string;
  origin: string;
  type: string;
  description: string;
}

export default function VarietyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [item, setItem] = useState<BacallaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/bacalla";

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Aquesta varietat de bacallà no existeix.");
          }
          throw new Error(`Error en connectar amb el servidor: ${res.statusText}`);
        }
        const data = await res.json();
        setItem(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "No s'ha pogut obtenir la informació de la varietat.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

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
            <Link href="/exercici2/nova" className="nav-link">Nova Varietat</Link>
            <span className="nav-badges">
              <span className="badge badge-express">Express</span>
              <span className="badge badge-nextjs">Next.js</span>
              <span className="badge badge-jsonapi">JSON API</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Detail Page */}
      <main className="container flex-grow" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="detail-container">
          <Link href="/exercici2" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "14px", fontWeight: "700", color: "var(--primary)" }}>
            ⬅ Tornar al llistat
          </Link>

          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#475569" }}>
              Carregant detalls de la varietat...
            </div>
          ) : error ? (
            <div className="alert alert-error" style={{ padding: "30px", textAlign: "center" }}>
              <h3 style={{ marginBottom: "10px" }}>Error de connexió</h3>
              <p>{error}</p>
            </div>
          ) : item ? (
            <div className="detail-card">
              <div className="detail-image-wrapper">
                <CodIllustration type={item.type} name={item.name} className="w-full h-full max-w-md" />
              </div>
              
              <div className="detail-body">
                <h1 className="detail-title">{item.name}</h1>
                
                <div className="detail-meta-grid">
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>ORIGEN GEOGRÀFIC</span>
                    <strong style={{ fontSize: "16px", color: "var(--text-dark)" }}>{item.origin}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>FORMA DE PRESENTACIÓ</span>
                    <strong style={{ fontSize: "16px", color: "var(--text-dark)" }}>{item.type}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-dark)", marginBottom: "8px" }}>DESCRIPCIÓ DETALLADA</h3>
                  <p className="detail-description">{item.description}</p>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                  <span className="card-id-badge" style={{ padding: "6px 12px", fontSize: "13px" }}>ID del recurs: {item.id}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Recurs proporcionat per l'API REST</span>
                </div>
              </div>
            </div>
          ) : null}
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
