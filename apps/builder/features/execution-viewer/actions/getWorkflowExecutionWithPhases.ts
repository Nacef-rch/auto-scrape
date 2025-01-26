"use server";

import { prisma } from "@workspace/db";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }
  return await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
