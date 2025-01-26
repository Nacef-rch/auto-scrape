"use server";

import { redirect } from "next/navigation";
//libs
import { Edge } from "@xyflow/react";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@workspace/db";
//Schemas + types
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";

export async function CreateWorkflowAction(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("invalid form");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  //Flow entry point
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });
  if (!result) {
    throw new Error("failed to create workflow");
  }
  redirect(`/workflow/editor/${result.id}`);
}
