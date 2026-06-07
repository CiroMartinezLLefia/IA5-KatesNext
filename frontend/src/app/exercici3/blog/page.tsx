import React from "react";
import Link from "next/link";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });
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
            <Link href="/exercici3" className="text-zinc-400 hover:text-white transition">Inici</Link>
            <Link href="/exercici3/blog" className="text-teal-400 transition">Blog</Link>
            
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

      {/* Main Blog List Content */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-grow">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-white mb-4">Blog de Tecnologia</h1>
          <p className="text-zinc-400 text-sm">
            Notícies, guies, consells tècnics i actualitat del sector. Articles redactats pels nostres enginyers de sistemes.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/exercici3/blog/${post.slug}`}
                className="group border border-zinc-900 bg-zinc-900/20 rounded-2xl overflow-hidden hover:border-teal-500/30 transition flex flex-col justify-between"
              >
                {/* Simulated / Loaded Image */}
                <div className="h-48 bg-zinc-900 relative overflow-hidden flex items-center justify-center border-b border-zinc-900">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <span className="text-zinc-600 font-mono text-xs">Sense imatge</span>
                  )}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-teal-400">
                    S13-S14
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-6">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
                    <span>Per <strong>{post.author.name || "Editor"}</strong></span>
                    <span>{new Date(post.createdAt).toLocaleDateString("ca-ES")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-zinc-900">
            <h3 className="text-lg font-bold text-white mb-2">No s'han trobat articles</h3>
            <p className="text-zinc-500 text-sm">Cal executar el seed o crear articles des del backoffice.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-500 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats.</p>
          <p>Next.js 16 + Prisma + PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
}
