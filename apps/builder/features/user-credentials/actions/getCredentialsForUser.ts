"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@workspace/db";

export async function getCredentialsForUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.credential.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      name: "asc",
    },
  });
}
