"use server";

import { prisma } from "@/db/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters."),
  email: z.string().email("El correu electrònic no és vàlid."),
  message: z.string().min(5, "El missatge ha de tenir almenys 5 caràcters."),
});

export interface ContactFormState {
  success?: boolean;
  error?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export async function submitContactRequest(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const validation = contactSchema.safeParse({ name, email, message });
  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      error: true,
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  try {
    await prisma.contactRequest.create({
      data: { name, email, message },
    });
    return { success: true };
  } catch (err) {
    console.error("Error al desar la petició de contacte:", err);
    return {
      error: true,
      message: "S'ha produït un error al servidor al desar la vostra consulta.",
    };
  }
}
