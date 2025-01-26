import React, { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

import { GetWorkflowExecutionWithPhases } from "@/features/execution-viewer/actions/getWorkflowExecutionWithPhases";
import ExecutionViewer from "@/features/execution-viewer/execution-viewer";
import TopBar from "@/app/workflow/_components/topbar/top-bar";

type Props = {
  params: {
    executionId: string;
    workflowId: string;
  };
};

const ExecutionViewerPage = ({ params }: Props) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopBar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID : ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
};

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution} />;
}

export default ExecutionViewerPage;
