"use server";

import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";
//types
import { WorkflowStatus } from "@/types/workflow";

//TODO :  WHEN CHANGING THE DATA BASE TO PLSQL CHANGE THE DEFINITION TO A JSON
export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) throw new Error("workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT)
    throw new Error("workflow is not in draft");

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition,
    },
  });

  revalidatePath("/workflows");
}
