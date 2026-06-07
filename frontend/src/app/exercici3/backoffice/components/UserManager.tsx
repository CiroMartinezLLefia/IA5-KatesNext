"use client";

import React, { useState } from "react";
import { updateUserRole } from "@/actions/admin";
import { Role } from "@prisma/client";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
}

interface UserManagerProps {
  users: User[];
  currentUserId: string;
}

export default function UserManager({ users, currentUserId }: UserManagerProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    if (userId === currentUserId) {
      alert("No pots canviar el teu propi rol de seguretat.");
      return;
    }
    
    if (!confirm(`Confirmes canviar el rol de l'usuari a ${newRole}?`)) {
      // Re-trigger render to restore value if needed
      window.location.reload();
      return;
    }

    try {
      setLoadingId(userId);
      const res = await updateUserRole(userId, newRole);
      if (res.error) {
        alert(res.error);
      } else {
        alert("Rol d'usuari actualitzat correctament!");
      }
    } catch (err) {
      console.error(err);
      alert("Error al connectar amb el servidor.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Gestió d'Usuaris</h2>
        <p className="text-zinc-500 text-xs mt-0.5">Control de rols i permisos del portal de Serveis Informàtics</p>
      </div>

      <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-900/10">
        {users.length > 0 ? (
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-zinc-900/60 border-b border-zinc-800 text-zinc-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Nom de l'usuari</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Data Registre</th>
                <th className="px-6 py-4 text-right">Rol de seguretat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-900/20 transition">
                  <td className="px-6 py-4 font-bold text-white">
                    {u.name || "Sense nom"}
                    {u.id === currentUserId && (
                      <span className="ml-2 px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-[10px] font-semibold">
                        Tu
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{u.email}</td>
                  <td className="px-6 py-4 text-xs text-zinc-500">
                    {new Date(u.createdAt).toLocaleDateString("ca-ES")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={u.role}
                      disabled={loadingId === u.id || u.id === currentUserId}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                    >
                      <option value="USER">USER</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-zinc-500">No s'han trobat usuaris a la base de dades.</div>
        )}
      </div>
    </div>
  );
}
