import React from "react";
import dynamic from "next/dynamic";
//libs
import { InboxIcon } from "lucide-react";
//types
import { WorkflowStatus } from "@/types/workflow";
//actions
import { GetWorkflowsForUser } from "@/features/user-work-flows/actions/getWorkflowsForUser";
//components
import AlertError from "@/components/alert-error";
import UserDataNotFound from "@/components/data-not-found";
import { CreateWorkflow } from "@/features/create-work-flow";
import { ScheduleWorkFlow } from "@/features/schedule-work-flow";
import { DuplicateWorkflow } from "@/features/duplicate-work-flow";
import RunButton from "@/features/run-work-flow/components/run-button";

const LazyWorkFlowCard = dynamic(
  () => import("@/features/user-work-flows/work-flow-card")
);

const UserWorkFlows = async () => {
  try {
    const workflows = await GetWorkflowsForUser();
    if (workflows.length === 0) {
      return (
        <UserDataNotFound
          icon={InboxIcon}
          title="No workflow created yet"
          description=" Click the button below to create your first workflow"
        >
          <CreateWorkflow triggerText="Create your first workflow" />
        </UserDataNotFound>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow) => (
          <LazyWorkFlowCard
            key={workflow.id}
            workflow={workflow}
            duplicateWorkflow={<DuplicateWorkflow workflowId={workflow.id} />}
            runWorkflow={<RunButton workflowId={workflow.id} />}
            scheduleWorkflow={
              <ScheduleWorkFlow
                isDraft={workflow.status === WorkflowStatus.DRAFT}
                creditsCost={workflow.creditsCost}
                workflowId={workflow.id}
                cron={workflow.cron}
              />
            }
          />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <AlertError
        title="Error"
        description="Something went wrong, please try again later"
      />
    );
  }
};

export default UserWorkFlows;
