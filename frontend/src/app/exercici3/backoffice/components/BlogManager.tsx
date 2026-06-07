"use client";

import React, { useState, startTransition } from "react";
import { createBlogPost, updateBlogPost, deleteBlogPost, BlogActionState } from "@/actions/blog";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
}

interface BlogManagerProps {
  posts: BlogPost[];
}

export default function BlogManager({ posts }: BlogManagerProps) {
  // Form view states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Field states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // UI UX states
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<BlogActionState | null>(null);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setContent("");
    setImageFile(null);
    setFeedback(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setImageFile(null);
    setFeedback(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Esteu segur de voler eliminar aquest article?")) return;
    
    try {
      const res = await deleteBlogPost(id);
      if (res.error) {
        alert(res.error);
      } else {
        alert("Article eliminat correctament!");
      }
    } catch (err) {
      console.error(err);
      alert("Error al connectar amb el servidor.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("slug", slug);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    if (editingPost) {
      formData.append("existingImage", editingPost.image);
    }

    startTransition(async () => {
      try {
        let res: BlogActionState;
        if (editingPost) {
          res = await updateBlogPost(editingPost.id, {}, formData);
        } else {
          res = await createBlogPost({}, formData);
        }

        setFeedback(res);
        setLoading(false);

        if (res.success) {
          setIsFormOpen(false);
          // Reset
          setTitle("");
          setSlug("");
          setContent("");
          setImageFile(null);
          alert(editingPost ? "Article modificat correctament!" : "Article creat correctament!");
        }
      } catch (err) {
        console.error(err);
        setFeedback({ error: true, message: "Error al processar la sol·licitud." });
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white">Gestió del Blog</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Creació, modificació i eliminació d'articles de premsa</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-teal-500 text-black hover:bg-teal-400 font-bold rounded-xl text-xs transition"
          >
            + Nou Article
          </button>
        )}
      </div>

      {/* Form (Modal/Drawer style block) */}
      {isFormOpen && (
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl max-w-2xl">
          <h3 className="text-lg font-bold text-white mb-6">
            {editingPost ? `Editar: ${editingPost.title}` : "Nou Article de Premsa"}
          </h3>

          {feedback?.error && feedback?.message && (
            <div className="p-3 mb-5 text-xs rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-center font-medium">
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">Títol de l'article</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Ex: Futur de la ciberseguretat"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-teal-500"
                />
                {feedback?.error && feedback?.errors?.title && (
                  <p className="text-red-500 text-xs mt-1">{feedback.errors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">Slug URL (Opcional)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Ex: futur-de-la-ciberseguretat"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-teal-500"
                />
                {feedback?.error && feedback?.errors?.slug && (
                  <p className="text-red-500 text-xs mt-1">{feedback.errors.slug}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">Imatge de capçalera (Fitxer Pujat)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-400 text-sm focus:outline-none focus:border-teal-500"
              />
              {editingPost?.image && !imageFile && (
                <p className="text-xs text-zinc-500 mt-1.5">Imatge actual: {editingPost.image}</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">Contingut de l'article</label>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Escriviu el redactat de l'article en text pla o format bàsic..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-teal-500 resize-none"
              />
              {feedback?.error && feedback?.errors?.content && (
                <p className="text-red-500 text-xs mt-1">{feedback.errors.content}</p>
              )}
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition text-xs font-bold"
              >
                Cancel·lar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-black hover:bg-teal-400 font-bold transition text-xs disabled:opacity-50"
              >
                {loading ? "Processant..." : editingPost ? "Modificar article" : "Crear article"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of articles */}
      {!isFormOpen && (
        <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-900/10">
          {posts.length > 0 ? (
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-900/60 border-b border-zinc-800 text-zinc-400 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Títol de l'article</th>
                  <th className="px-6 py-4">URL Slug</th>
                  <th className="px-6 py-4">Imatge</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4 text-right">Accions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-900/20 transition">
                    <td className="px-6 py-4 font-bold text-white">{post.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">{post.slug}</td>
                    <td className="px-6 py-4 text-xs text-teal-500 truncate max-w-[150px]">{post.image || "cap"}</td>
                    <td className="px-6 py-4 text-xs text-zinc-500">
                      {new Date(post.createdAt).toLocaleDateString("ca-ES")}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300 hover:border-teal-500/40 hover:text-teal-400 transition text-xs font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:border-red-500/40 hover:text-red-400 transition text-xs font-semibold"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-zinc-500">No s'ha trobat cap article de blog.</div>
          )}
        </div>
      )}
    </div>
  );
}
