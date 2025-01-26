import React from "react";
//libs
import { InboxIcon } from "lucide-react";
//actions
import { GetWorkflowExecutions } from "./actions/getWorkflowExecutions";
//components
import AlertError from "@/components/alert-error";
import UserDataNotFound from "@/components/data-not-found";
import { ExecutionsTable } from "./components/executions-table";

const WorkFlowExecutions = async ({ workflowId }: { workflowId: string }) => {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return (
      <AlertError
        title="Error"
        description="Something went wrong, please try again later"
      />
    );
  }
  if (executions.length === 0) {
    return (
      <UserDataNotFound
        icon={InboxIcon}
        title="No executions created yet"
        description="Click the button below to create your first execution"
      />
    );
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
};

export default WorkFlowExecutions;
