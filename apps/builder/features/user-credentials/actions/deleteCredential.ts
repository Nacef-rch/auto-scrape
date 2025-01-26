"use server";
import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";

export async function DeleteCredential(name: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  //we can check if the credential is used in a workflow and we show a confirm dialog saying that the credential is used !!
  await prisma.credential.delete({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  revalidatePath("/credentials");
}
