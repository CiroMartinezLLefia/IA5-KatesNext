"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from "fs";
import path from "path";

const blogSchema = z.object({
  title: z.string().min(3, "El títol ha de tenir almenys 3 caràcters."),
  content: z.string().min(10, "El contingut ha de tenir almenys 10 caràcters."),
  slug: z.string().min(3, "El slug ha de tenir almenys 3 caràcters."),
  image: z.string().optional(),
});

export interface BlogActionState {
  success?: boolean;
  error?: boolean;
  message?: string;
  errors?: {
    title?: string;
    content?: string;
    slug?: string;
  };
}

// Helper: check editor permission
async function checkPermission() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("No autenticat");
  }
  const role = (session.user as any).role;
  if (role !== "EDITOR" && role !== "ADMIN") {
    throw new Error("No autoritzat");
  }
  return session.user;
}

// Helper: Slugify title
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createBlogPost(
  prevState: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  try {
    const user = await checkPermission();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    let slug = formData.get("slug") as string;
    if (!slug || !slug.trim()) {
      slug = slugify(title);
    }
    
    // Handle File upload
    const imageFile = formData.get("imageFile") as File;
    let imageUrl = "/blog/nextjs.jpg"; // Default fallback

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const fileName = `${Date.now()}-${slugify(imageFile.name.split(".")[0])}.${imageFile.name.split(".").pop()}`;
        const filePath = path.join(uploadDir, fileName);
        
        await fs.promises.writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      } catch (err) {
        console.error("Error al desar el fitxer localment:", err);
      }
    }

    const validation = blogSchema.safeParse({ title, content, slug });
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      return {
        error: true,
        errors: {
          title: fieldErrors.title?.[0],
          content: fieldErrors.content?.[0],
          slug: fieldErrors.slug?.[0],
        },
      };
    }

    // Check if slug is unique
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return {
        error: true,
        errors: {
          slug: "Aquest slug ja està en ús per un altre article.",
        },
      };
    }

    await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        image: imageUrl,
        authorId: user.id as string,
      },
    });

    revalidatePath("/exercici3/blog");
    revalidatePath("/exercici3/backoffice");
    return { success: true };

  } catch (err: any) {
    console.error("Error al crear article:", err);
    return { error: true, message: err.message || "S'ha produït un error en crear l'article." };
  }
}

export async function updateBlogPost(
  id: string,
  prevState: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  try {
    await checkPermission();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string || slugify(title);
    
    const imageFile = formData.get("imageFile") as File;
    let imageUrl = formData.get("existingImage") as string;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const fileName = `${Date.now()}-${slugify(imageFile.name.split(".")[0])}.${imageFile.name.split(".").pop()}`;
        const filePath = path.join(uploadDir, fileName);
        
        await fs.promises.writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      } catch (err) {
        console.error("Error al desar el fitxer localment:", err);
      }
    }

    const validation = blogSchema.safeParse({ title, content, slug });
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      return {
        error: true,
        errors: {
          title: fieldErrors.title?.[0],
          content: fieldErrors.content?.[0],
          slug: fieldErrors.slug?.[0],
        },
      };
    }

    // Check slug uniqueness (excluding current)
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });
    if (existing) {
      return {
        error: true,
        errors: {
          slug: "Aquest slug ja està en ús per un altre article.",
        },
      };
    }

    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        image: imageUrl,
      },
    });

    revalidatePath("/exercici3/blog");
    revalidatePath(`/exercici3/blog/${slug}`);
    revalidatePath("/exercici3/backoffice");
    return { success: true };

  } catch (err: any) {
    console.error("Error al modificar article:", err);
    return { error: true, message: err.message || "Error al modificar l'article." };
  }
}

export async function deleteBlogPost(id: string): Promise<{ success?: boolean; error?: string }> {
  try {
    await checkPermission();
    
    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/exercici3/blog");
    revalidatePath("/exercici3/backoffice");
    return { success: true };
  } catch (err: any) {
    console.error("Error al eliminar article:", err);
    return { error: err.message || "Error al eliminar l'article." };
  }
}
