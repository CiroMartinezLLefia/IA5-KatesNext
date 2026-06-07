"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

// Admin-only role update action
export async function updateUserRole(userId: string, newRole: Role) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("No autenticat");
    }

    const currentRole = (session.user as any).role;
    const currentUserId = (session.user as any).id;

    if (currentRole !== "ADMIN") {
      throw new Error("No autoritzat (només ADMIN)");
    }

    // Prevent admin from changing their own role to prevent lockout
    if (userId === currentUserId) {
      throw new Error("No pots modificar el teu propi rol de seguretat.");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/exercici3/backoffice");
    return { success: true };
  } catch (err: any) {
    console.error("Error al canviar rol d'usuari:", err);
    return { error: err.message || "Error intern al actualitzar el rol." };
  }
}
