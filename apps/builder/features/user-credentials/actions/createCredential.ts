"use server";

import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";
//libs
import { symmetricEncrypt } from "@/lib/encryption";
//schema
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential";

export async function createCredential(form: createCredentialSchemaType) {
  const { success, data } = createCredentialSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }
  // Encrypt the value
  const encryptedValue = symmetricEncrypt(data.value);
  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Failed to create credential");
  }

  revalidatePath("/credentials");
}
