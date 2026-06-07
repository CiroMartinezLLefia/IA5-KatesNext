import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import BlogManager from "./components/BlogManager";
import UserManager from "./components/UserManager";

export const dynamic = "force-dynamic";

export default async function BackofficePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/exercici3/auth/login");
  }

  const role = (session.user as any).role;
  const currentUserId = (session.user as any).id;

  if (role !== "EDITOR" && role !== "ADMIN") {
    redirect("/exercici3?error=AccesDenegat");
  }

  // Fetch data
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const users = role === "ADMIN" ? await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  }) : [];

  const contactRequests = role === "ADMIN" ? await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  }) : [];

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
            <Link href="/exercici3" className="text-zinc-400 hover:text-white transition">Anar a l'Inici</Link>
            <Link href="/exercici3/blog" className="text-zinc-400 hover:text-white transition">Anar al Blog</Link>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              Sessió: <strong className="text-teal-400">{session.user?.name}</strong> ({role})
            </span>
            <Link
              href="/exercici3/auth/logout"
              className="px-3.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition text-xs font-bold"
            >
              Sortir
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Backoffice Panel */}
      <main className="max-w-7xl w-full mx-auto px-6 py-12 flex-grow flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-black text-white">Tauler de Control de Backoffice</h1>
          <p className="text-zinc-500 text-sm mt-1">Gestioneu els serveis, les entrades de bloc i els permisos dels usuaris</p>
        </div>

        {/* Layout Tabs / Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Info & Contact Requests (ADMIN only) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* System Info */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4">Informació del Sistema</h3>
              <ul className="flex flex-col gap-3 text-xs text-zinc-400">
                <li className="flex justify-between">
                  <span>Base de dades:</span>
                  <span className="text-white font-mono">PostgreSQL (Prisma)</span>
                </li>
                <li className="flex justify-between">
                  <span>Estat conexió:</span>
                  <span className="text-emerald-500 font-bold">ACTIVA</span>
                </li>
                <li className="flex justify-between">
                  <span>Rols actius:</span>
                  <span className="text-white">USER, EDITOR, ADMIN</span>
                </li>
                <li className="flex justify-between">
                  <span>Estructura:</span>
                  <span className="text-white">Next.js 16 MVC</span>
                </li>
              </ul>
            </div>

            {/* Contact Requests List (ADMIN only) */}
            {role === "ADMIN" && (
              <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl flex flex-col gap-4 max-h-[450px] overflow-y-auto">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">Consultes de Contacte</h3>
                  <p className="text-zinc-500 text-[10px] mt-0.5">Missatges rebuts des del formulari de la Home</p>
                </div>

                {contactRequests.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {contactRequests.map((req) => (
                      <div key={req.id} className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl flex flex-col gap-1 text-xs">
                        <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                          <strong>{req.name}</strong>
                          <span>{new Date(req.createdAt).toLocaleDateString("ca-ES")}</span>
                        </div>
                        <span className="text-teal-500 text-[10px]">{req.email}</span>
                        <p className="text-zinc-400 mt-2 font-light italic leading-relaxed">
                          "{req.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-zinc-500 text-xs">No hi ha consultes de contacte desades.</div>
                )}
              </div>
            )}
          </div>

          {/* Right panel: Main Managers (Tab/Separators) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Blog Section (All editors/admins) */}
            <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl">
              <BlogManager posts={posts} />
            </div>

            {/* User Section (ADMIN only) */}
            {role === "ADMIN" && (
              <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl">
                <UserManager users={users} currentUserId={currentUserId} />
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[11px]">
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats.</p>
          <p>NextAuth v5 + Prisma PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
}
