import { Suspense } from "react";
//libs
import { Loader2Icon } from "lucide-react";
//components
import TopBar from "../../_components/topbar/top-bar";
import WorkFlowExecutions from "@/features/executions-table/work-flow-executions";

export default function ExecutionsPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="List of all your workflow runs"
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={20} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <WorkFlowExecutions workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}
