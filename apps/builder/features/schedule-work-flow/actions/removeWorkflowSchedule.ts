"use server";

import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";

export async function RemoveWorkflowSchedule(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath("/workflows");
}
