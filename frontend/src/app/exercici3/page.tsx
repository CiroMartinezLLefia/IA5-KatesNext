import React from "react";
import Link from "next/link";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import ContactForm from "./components/ContactForm";

export const dynamic = "force-dynamic";

export default async function ServeisInformaticsPage() {
  const services = await prisma.service.findMany();
  const session = await auth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-teal-600 selection:text-white">
      {/* Header / Navbar */}
      <nav className="border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/exercici3" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 font-bold group-hover:bg-teal-500 group-hover:text-black transition duration-300">
              ⚙️
            </span>
            <span className="font-bold text-lg text-white group-hover:text-teal-400 transition duration-300">
              Kates Serveis Informàtics
            </span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-zinc-400 hover:text-zinc-200" style={{ color: "#3b82f6" }}>⬅ HUB</Link>
            <Link href="/exercici3/blog" className="text-zinc-400 hover:text-white transition">Blog</Link>
            
            {session ? (
              <>
                {((session.user as any).role === "ADMIN" || (session.user as any).role === "EDITOR") && (
                  <Link href="/exercici3/backoffice" className="text-teal-400 hover:text-teal-300 transition">
                    Backoffice
                  </Link>
                )}
                <span className="text-zinc-500 border-l border-zinc-800 pl-4">
                  {session.user?.name} ({ (session.user as any).role })
                </span>
                <Link
                  href="/exercici3/auth/logout"
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-red-400 transition text-xs"
                >
                  Tancar sessió
                </Link>
              </>
            ) : (
              <Link
                href="/exercici3/auth/login"
                className="px-3.5 py-1.5 rounded-lg bg-teal-500 text-black hover:bg-teal-400 transition text-xs"
              >
                Accés Backoffice
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/20 via-zinc-950 to-zinc-950" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Exercici 3 - S12-S15
              </span>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-zinc-800 text-zinc-400">
                Full-stack Prisma PostgreSQL
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-none">
              Solucions Tecnològiques <span className="text-teal-400">per al teu Negoci</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl">
              Oferim serveis professionals d'enginyeria de software, ciberseguretat, administració de servidors al núvol i manteniment tècnic. Ens encarreguem de la teva tecnologia per a que puguis centrar-te en créixer.
            </p>
            <div className="flex gap-4">
              <a
                href="#contacte"
                className="px-6 py-3 rounded-xl bg-teal-500 text-black hover:bg-teal-400 transition font-bold"
              >
                Contactar ara
              </a>
              <Link
                href="/exercici3/blog"
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition font-bold"
              >
                Llegir el Blog
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            {/* Visual server graphic */}
            <div className="border border-zinc-800 bg-zinc-900/20 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm">
              <div className="w-4 h-4 rounded-full bg-teal-500 absolute top-4 right-4 animate-pulse" />
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider text-teal-400">Estatus del Sistema</h3>
              <div className="flex flex-col gap-2 font-mono text-xs text-zinc-500">
                <p className="text-zinc-300">&gt; npm run start</p>
                <p className="text-teal-500">🔌 Connection secure with Prisma client</p>
                <p className="text-teal-500">🗄️ Connected to PostgreSQL Database</p>
                <p className="text-teal-500">🛡️ AuthJS Middleware interceptor: active</p>
                <p className="text-zinc-400">&gt; systems checking complete. OK</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 max-w-7xl w-full mx-auto px-6 border-b border-zinc-900">
        <h2 className="text-3xl font-black text-white text-center mb-2">Els Nostres Serveis</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-lg mx-auto">
          Dades reals llegides des de la base de dades PostgreSQL mitjançant l'ORM Prisma.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: any) => (
            <div key={service.id} className="p-6 bg-zinc-900/25 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-teal-500/40 transition">
              <div>
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{service.description}</p>
              </div>
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 uppercase tracking-wider font-semibold">Preu estimat</span>
                <span className="text-teal-400 font-bold text-sm">des de {service.price}€</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacte" className="py-20 max-w-4xl w-full mx-auto px-6">
        <h2 className="text-3xl font-black text-white text-center mb-2">Formulari de Contacte</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-md mx-auto">
          Deixeu-nos la vostra consulta i es desarà a la base de dades PostgreSQL mitjançant Server Actions.
        </p>

        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <p className="font-semibold text-zinc-400">Serveis Informàtics S12-S15 — Projecte Acadèmic</p>
          </div>
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats.</p>
        </div>
      </footer>
    </div>
  );
}
