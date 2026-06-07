import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { beers } from "../../data/beers";
import BeerIllustration from "../../components/BeerIllustration";

interface BeerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return beers.map((beer) => ({
    id: beer.id,
  }));
}

export default async function BeerDetailPage({ params }: BeerDetailPageProps) {
  const { id } = await params;
  const beer = beers.find((b) => b.id === id);

  if (!beer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      {/* Header / Navbar */}
      <nav className="border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/exercici1" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 font-bold group-hover:bg-amber-500 group-hover:text-black transition duration-300">
              🍺
            </span>
            <span className="font-bold text-lg text-white group-hover:text-amber-400 transition duration-300">
              Cerveses Artesanes
            </span>
          </Link>
          <Link
            href="/exercici1"
            className="flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tornar al llistat
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="sticky top-24">
              <BeerIllustration style={beer.style} className="w-full h-80 md:h-[450px]" />
              
              <div className="mt-4 p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/80 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-1">Cervesera</p>
                <p className="text-white font-bold text-lg">{beer.brewery}</p>
                <p className="text-zinc-400 text-xs mt-1">{beer.origin}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {beer.style}
                </span>
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-zinc-800 text-zinc-300">
                  {beer.abv}% ABV
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                {beer.name}
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
                "{beer.description}"
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-2">Sobre la cervesa</h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {beer.longDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-2">Notes de tast</h2>
              <p className="text-zinc-400 leading-relaxed text-sm bg-zinc-900/20 p-4 rounded-xl border border-zinc-800/80">
                {beer.tastingNotes}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 p-5 bg-zinc-900/30 rounded-xl border border-zinc-800/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <span>🌾</span> Ingredients
                </h3>
                <ul className="flex flex-col gap-1.5 text-sm text-zinc-400">
                  {beer.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 p-5 bg-zinc-900/30 rounded-xl border border-zinc-800/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <span>🍽️</span> Maridatge recomanat
                </h3>
                <ul className="flex flex-col gap-1.5 text-sm text-zinc-400">
                  {beer.pairing.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
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
