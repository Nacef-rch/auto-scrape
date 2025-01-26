"use server";

import { revalidatePath } from "next/cache";
//auth
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";
//types
import { WorkflowStatus } from "@/types/workflow";

export async function UnpublishWorkflow(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("workflow is not published");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
