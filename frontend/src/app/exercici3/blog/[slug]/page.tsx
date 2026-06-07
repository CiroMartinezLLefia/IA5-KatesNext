import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function BlogPostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-teal-600 selection:text-white">
      {/* Navbar */}
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
            <Link
              href="/exercici3/blog"
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition text-xs"
            >
              ⬅ Tornar al blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog Detail Main */}
      <main className="max-w-3xl w-full mx-auto px-6 py-12 flex-grow">
        <article>
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-between py-4 border-y border-zinc-900 text-sm text-zinc-500 font-medium">
              <span>Per <strong>{post.author.name || "Editor"}</strong></span>
              <span>{new Date(post.createdAt).toLocaleDateString("ca-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </header>

          {/* Banner Image */}
          {post.image && (
            <div className="w-full h-80 md:h-[400px] bg-zinc-900 rounded-3xl overflow-hidden mb-10 border border-zinc-900">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-teal max-w-none">
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-500 text-sm">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Ciro. Tots els drets reservats.</p>
          <p>Dades connectades a PostgreSQL amb Prisma</p>
        </div>
      </footer>
    </div>
  );
}
