"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { beers } from "./data/beers";
import BeerIllustration from "./components/BeerIllustration";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Tots");

  const styles = useMemo(() => {
    const allStyles = beers.map((beer) => beer.style.split(" (")[0]);
    return ["Tots", ...Array.from(new Set(allStyles))];
  }, []);

  const filteredBeers = useMemo(() => {
    return beers.filter((beer) => {
      const matchesSearch =
        beer.name.toLowerCase().includes(search.toLowerCase()) ||
        beer.brewery.toLowerCase().includes(search.toLowerCase()) ||
        beer.origin.toLowerCase().includes(search.toLowerCase());
      
      const matchesStyle =
        selectedStyle === "Tots" ||
        beer.style.toLowerCase().includes(selectedStyle.toLowerCase());

      return matchesSearch && matchesStyle;
    });
  }, [search, selectedStyle]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      {/* Header Banner */}
      <header className="relative overflow-hidden border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/20 to-orange-950/10 opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full -mr-20 -mt-20" />
        
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  Exercici 1
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-zinc-800 text-zinc-400">
                  Next.js App Router
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200">
                Cerveses Artesanes <span className="text-amber-500">de Catalunya</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Un recorregut pel sabor local de les millors microcerveseres del territori català, des del Penedès fins a la Costa Brava.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-amber-400 transition"
              >
                ⬅ Tornar al HUB
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Cerca per nom, cervesera o origen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition text-sm"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Style Filter Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-start md:justify-end">
            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mr-2">Estil:</span>
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition border ${
                  selectedStyle === style
                    ? "bg-amber-500 text-black border-amber-500"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-zinc-500 text-sm">
            S'han trobat <span className="text-zinc-300 font-semibold">{filteredBeers.length}</span> cerveses.
          </p>
        </div>

        {/* Grid of Beers */}
        {filteredBeers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeers.map((beer) => (
              <Link
                key={beer.id}
                href={`/exercici1/cerveses/${beer.id}`}
                className="group relative flex flex-col bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header */}
                <div className="h-48 relative overflow-hidden flex items-center justify-center bg-zinc-950/50">
                  <BeerIllustration style={beer.style} className="w-full h-full p-6" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                    <span className="text-amber-500 text-xs font-bold">{beer.abv}% ABV</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{beer.style}</span>
                      <span className="text-zinc-500 text-xs font-medium">{beer.origin.split(", ")[1]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition duration-300 mb-1">
                      {beer.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-medium mb-3">
                      Elaborada per <span className="text-zinc-300 font-semibold">{beer.brewery}</span>
                    </p>
                    <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                      {beer.description}
                    </p>
                  </div>

                  {/* Actions / Hover Indicator */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-amber-400 transition-colors">
                    <span>Veure fitxa completa</span>
                    <svg
                      className="h-4 w-4 transform translate-x-0 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800/80">
            <svg
              className="mx-auto h-12 w-12 text-zinc-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-white mb-1">No s'han trobat cerveses</h3>
            <p className="text-zinc-500 text-sm">Provau de modificar el text de cerca o el filtre d'estil.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="font-semibold text-zinc-400">Projecte de Cerveses Catalanes — M0613 IA5</p>
          </div>
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats.</p>
        </div>
      </footer>
    </div>
  );
}
