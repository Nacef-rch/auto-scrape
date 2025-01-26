"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
//database
import { prisma } from "@workspace/db";
//libs
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { FlowToExecutionPlan } from "@/lib/execution-plan";
//types
import { WorkflowStatus } from "@/types/workflow";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
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
  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("cannot publish a workflow that is not in draft");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("Flow definition is invalid");
  }
  if (!result.executionPlan) {
    throw new Error("No execution plan generated");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      status: WorkflowStatus.PUBLISHED,
      creditsCost,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
