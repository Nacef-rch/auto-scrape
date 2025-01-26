import React from "react";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@workspace/db";

type Props = {
  params: {
    workflowId: string;
  };
};
const LazyEditor = dynamic(() => import("../../_components/editor"));

const page = async ({ params }: Props) => {
  const { workflowId } = params;
  const { userId } = await auth();
  if (!userId) return <div>unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>workflow not found</div>;
  }

  return <LazyEditor workflow={workflow} />;
};

export default page;
