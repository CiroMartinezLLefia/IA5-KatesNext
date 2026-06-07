import React from "react";
import Link from "next/link";

export default function HubPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 blur-[120px] rounded-full -ml-40 -mb-40 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 height-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500 font-black text-lg">
              K
            </span>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white leading-none">
                IA5 - Kates Next
              </h1>
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block mt-0.5">
                Desenvolupament Full-stack · M0616
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
              Professorat: Martinez26
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
              Alumne: Ciro
            </span>
          </div>
        </div>
      </header>

      {/* Main portal grid */}
      <main className="max-w-7xl w-full mx-auto px-6 py-16 flex-grow flex flex-col justify-center gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4 inline-block">
            Portal Acadèmic Unificat (HUB)
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-none">
            Desenvolupament Tècnic <br />
            Next.js & Express API
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Projecte integrat que consolida rutes multipàgina, integracions amb APIs REST externes, seguretat basada en rols, i persistència de dades full-stack.
          </p>
        </div>

        {/* Grid of the three exercises */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Exercici 1 */}
          <div className="group border border-zinc-900 hover:border-amber-500/30 bg-zinc-900/10 hover:bg-zinc-900/25 p-8 rounded-3xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 text-xl font-bold mb-6 group-hover:scale-105 transition">
                🍺
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-500 transition">
                Exercici 1
              </h3>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-4">
                Web de Cerveses Catalanes
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Aplicació multipàgina utilitzant Next.js App Router. Implementa un catàleg interactiu amb cercador, filtres d'estil i fitxa tècnica detallada per cada microcervesera.
              </p>
            </div>
            
            <Link
              href="/exercici1"
              className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl text-center text-xs hover:bg-amber-500 hover:text-black hover:border-amber-500 transition duration-300 block"
            >
              Explorar Exercici 1 ➜
            </Link>
          </div>

          {/* Exercici 2 */}
          <div className="group border border-zinc-900 hover:border-teal-500/30 bg-zinc-900/10 hover:bg-zinc-900/25 p-8 rounded-3xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 text-xl font-bold mb-6 group-hover:scale-105 transition">
                🐟
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-teal-500 transition">
                Exercici 2
              </h3>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-4">
                API Express & Client Next.js
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Capa frontend del domini Bacallà que consumeix peticions d'una API Express separada. Inclou persistència real a MongoDB Atlas, validacions amb Zod i gestió d'errors de CORS.
              </p>
            </div>
            
            <Link
              href="/exercici2"
              className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl text-center text-xs hover:bg-teal-500 hover:text-black hover:border-teal-500 transition duration-300 block"
            >
              Explorar Exercici 2 ➜
            </Link>
          </div>

          {/* Exercici 3 */}
          <div className="group border border-zinc-900 hover:border-blue-500/30 bg-zinc-900/10 hover:bg-zinc-900/25 p-8 rounded-3xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 text-xl font-bold mb-6 group-hover:scale-105 transition">
                ⚙️
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-500 transition">
                Exercici 3
              </h3>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-4">
                Serveis Informàtics Fullstack
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Continuïtat de les sessions S12-S15. Manteniment de blog amb base de dades PostgreSQL (via Prisma), control d'accés amb Auth.js, rols d'usuari i pujades de fitxers locals.
              </p>
            </div>
            
            <Link
              href="/exercici3"
              className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl text-center text-xs hover:bg-blue-500 hover:text-black hover:border-blue-500 transition duration-300 block"
            >
              Explorar Exercici 3 ➜
            </Link>
          </div>

        </div>

        {/* Technical overview of the monorepo */}
        <div className="p-8 border border-zinc-900 bg-zinc-900/10 rounded-3xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Arquitectura de Desplegament</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-500 leading-relaxed font-light">
            <div>
              <h4 className="font-bold text-white mb-1.5">Frontend HUB (Vercel)</h4>
              <p>
                Aquest projecte Next.js unificat conté el HUB i els tres frontends. S'ha configurat per a ser desplegat de forma senzilla a **Vercel** amb connexions automàtiques cap a l'API i PostgreSQL.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1.5">Backend API (Render)</h4>
              <p>
                L'API Express que serveix les varietats del bacallà es troba al directori `/backend` i està preparada per a aixecar un procés continu a **Render** connectat a MongoDB Atlas.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-600 text-xs text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats. Projecte acadèmic M0613 & M0616.</p>
        </div>
      </footer>
    </div>
  );
}
