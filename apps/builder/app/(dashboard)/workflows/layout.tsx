import React, { Suspense } from "react";
//components
import { CreateWorkflow } from "@/features/create-work-flow";
import { WorkFlowSkeleton } from "./loading";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflow />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<WorkFlowSkeleton count={4} />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default layout;
