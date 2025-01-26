"use server";

import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";
//libs
import parser from "cron-parser";

export async function updateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  try {
    const interval = parser.parseExpression(cron, { utc: true }); //here we use all timezones in UTC
    await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.error("invalid cron", error.message);
    throw new Error("invalid cron expression");
  }

  revalidatePath("/workflows");
}
