"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CodIllustration from "./components/CodIllustration";

interface BacallaItem {
  id: string;
  name: string;
  origin: string;
  type: string;
  description: string;
  image?: string;
}

export default function HomePage() {
  const [items, setItems] = useState<BacallaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [search, setSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("Tots");
  const [selectedType, setSelectedType] = useState("Tots");
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/bacalla";

  const fetchVarieties = async () => {
    try {
      setLoading(true);
      setError("");
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (selectedOrigin !== "Tots") queryParams.append("origin", selectedOrigin);
      if (selectedType !== "Tots") queryParams.append("type", selectedType);
      
      const res = await fetch(`${API_URL}?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error(`Error en obtenir les dades: ${res.statusText}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError("No s'ha pogut connectar amb l'API de l'Express. Assegureu-vos que el backend està actiu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVarieties();
  }, [selectedOrigin, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVarieties();
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
            <Link href="/" className="nav-link" style={{ color: "#2563eb", fontWeight: "700" }}>⬅ HUB</Link>
            <Link href="/exercici2" className="nav-link active">Inici</Link>
            <Link href="/exercici2/nova" className="nav-link">Nova Varietat</Link>
            <span className="nav-badges">
              <span className="badge badge-express">Express</span>
              <span className="badge badge-nextjs">Next.js</span>
              <span className="badge badge-jsonapi">JSON API</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">Descobreix les varietats i presentacions del bacallà</h1>
            <p className="hero-subtitle">
              Frontend de Next.js que consumeix una API REST en JSON creada amb Express. Implementació d'arquitectura full-stack amb rutes dinàmiques i persistència de dades.
            </p>
            
            <div className="hero-info-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Tema: origen, tipus de salaó, nom comercial i descripció.</span>
            </div>

            <div className="hero-badges-row">
              <div className="hero-badge-check">
                <span className="icon-check">✓</span> CORS OK
              </div>
              <div className="hero-badge-check">
                <span className="icon-code">&lt;/&gt;</span> GET /api/bacalla
              </div>
              <div className="hero-badge-check">
                <span className="icon-db">🗄️</span> 5+ elements
              </div>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <rect width="300" height="240" fill="#f1f5f9" />
                <ellipse cx="150" cy="165" rx="110" ry="40" fill="#cbd5e1" opacity="0.5" />
                <ellipse cx="150" cy="160" rx="100" ry="35" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                <ellipse cx="150" cy="160" rx="75" ry="25" fill="#f8fafc" />
                <path d="M100 145 C120 120, 170 120, 190 145 C195 155, 175 170, 150 170 C125 170, 95 155, 100 145 Z" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
                <ellipse cx="120" cy="148" rx="8" ry="4" fill="#fef08a" transform="rotate(-15, 120, 148)" />
                <ellipse cx="160" cy="142" rx="8" ry="4" fill="#fef08a" transform="rotate(20, 160, 142)" />
                <ellipse cx="140" cy="155" rx="6" ry="3" fill="#fef08a" />
                <path d="M90 150 Q150 110 200 155" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                <circle cx="115" cy="138" r="3" fill="#15803d" />
                <circle cx="175" cy="150" r="4" fill="#15803d" />
                <path d="M125 155 Q130 162 135 158" stroke="#16a34a" strokeWidth="2" fill="none" />
                <circle cx="185" cy="160" r="10" fill="#dc2626" />
                <circle cx="182" cy="156" r="3" fill="#fca5a5" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Catalog Area */}
      <main className="container flex-grow">
        {/* Filters Bar */}
        <form onSubmit={handleSearchSubmit} className="filters-bar">
          <div className="filter-input-wrapper">
            <input
              type="text"
              placeholder="Buscar per nom, origen o tipus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input"
            />
            <span className="filter-search-icon">🔍</span>
          </div>
          
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="filter-select"
          >
            <option value="Tots">Origen (Tots)</option>
            <option value="Atlàntic Nord">Atlàntic Nord</option>
            <option value="Catalunya">Catalunya</option>
            <option value="Islàndia">Islàndia</option>
            <option value="Portugal">Portugal</option>
            <option value="Galícia">Galícia</option>
            <option value="Noruega">Noruega</option>
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="Tots">Tipus (Tots)</option>
            <option value="salat">Salat</option>
            <option value="esqueixat">Esqueixat</option>
            <option value="fresc">Fresc</option>
            <option value="peça noble">Peça noble</option>
            <option value="dessalat">Dessalat</option>
            <option value="fumat">Fumat</option>
          </select>
          
          <button type="submit" className="filter-button">Filtrar</button>
          
          <Link href="/exercici2/nova" className="filter-button" style={{ backgroundColor: "#2563eb" }}>
            Afegir +
          </Link>
        </form>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#475569" }}>
            Carregant les varietats del servidor Express...
          </div>
        ) : items.length > 0 ? (
          <div className="cards-grid">
            {items.map((item) => (
              <div key={item.id} className="card">
                <div className="card-image-wrapper">
                  <CodIllustration type={item.type} name={item.name} />
                </div>
                
                <div className="card-body">
                  <div>
                    <h3 className="card-title">{item.name}</h3>
                    
                    <div className="card-meta">
                      <div className="card-meta-item">
                        <span className="card-meta-icon">📍</span>
                        <span>Origen: <strong>{item.origin}</strong></span>
                      </div>
                      <div className="card-meta-item">
                        <span className="card-meta-icon">🏷️</span>
                        <span>Tipus: <strong>{item.type}</strong></span>
                      </div>
                    </div>
                    
                    <p className="card-description">{item.description}</p>
                  </div>
                  
                  <div className="card-footer-row">
                    <span className="card-id-badge">id: {item.id}</span>
                    <Link href={`/exercici2/varietats/${item.id}`} className="card-link">
                      Veure detall ➜
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px", border: "1px dashed var(--border-color)", borderRadius: "16px", backgroundColor: "#ffffff" }}>
            <h3 style={{ marginBottom: "8px", fontWeight: 700 }}>No s'han trobat varietats</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Modifiqueu la cerca o doneu d'alta noves varietats des de la pestanya superior.</p>
          </div>
        )}

        {/* Technical Summary section */}
        <section className="tech-summary-section">
          <h3 className="tech-summary-title">Resum tècnic</h3>
          
          <div className="tech-summary-grid">
            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#e2f1e6" }}>
                <span style={{ fontSize: "20px" }}>🟢</span>
              </div>
              <div className="tech-content">
                <h4>Backend</h4>
                <p>Express / Node.js. Serveix JSON a través d'endpoints REST robustos.</p>
              </div>
            </div>

            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#f1f5f9" }}>
                <span style={{ fontSize: "20px" }}>🔵</span>
              </div>
              <div className="tech-content">
                <h4>Frontend</h4>
                <p>Next.js 16 (App Router) utilitzant React i Client Components interactius.</p>
              </div>
            </div>

            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#e0f2fe" }}>
                <span style={{ fontSize: "20px" }}>🔗</span>
              </div>
              <div className="tech-content">
                <h4>Format</h4>
                <p>API REST amb format JSON. Suporta paràmetres de cerca i filtres dinàmics.</p>
              </div>
            </div>

            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#fae8ff" }}>
                <span style={{ fontSize: "20px" }}>💾</span>
              </div>
              <div className="tech-content">
                <h4>Dades</h4>
                <p>MongoDB Atlas amb mongoose. Caiguda de seguretat (fallback) a Array de JS.</p>
              </div>
            </div>

            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#ffedd5" }}>
                <span style={{ fontSize: "20px" }}>🛡️</span>
              </div>
              <div className="tech-content">
                <h4>Bones pràctiques</h4>
                <p>CORS permès, validació de tipus amb Zod, i variables d'entorn.</p>
              </div>
            </div>

            <div className="tech-item">
              <div className="tech-icon-wrapper" style={{ backgroundColor: "#fef9c3" }}>
                <span style={{ fontSize: "20px" }}>🤖</span>
              </div>
              <div className="tech-content">
                <h4>IA i Agent Skills</h4>
                <p>S'ha documentat l'entorn i les col·leccions de skills al README.</p>
              </div>
            </div>
          </div>
        </section>
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
