"use client";
import React from "react";
import Link from "next/link";
//libs
import { ShuffleIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
//types
import { Workflow } from "@workspace/db";
import { WorkflowStatus } from "@/types/workflow";
//constants
import { STATUS_COLORS } from "@/constants/theme-constants";
//components
import TooltipWrapper from "@/components/tooltip-wrapper";
import { buttonVariants } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import WorkFlowIcon from "./components/work-flow-card/work-flow-icon";
import LastRunDetails from "./components/work-flow-card/last-run-details";
import WorkflowActions from "./components/work-flow-card/work-flow-actions";

type Props = {
  workflow: Workflow;
  duplicateWorkflow: JSX.Element;
  runWorkflow: JSX.Element;
  scheduleWorkflow: JSX.Element;
};

const WorkFlowCard = ({
  workflow,
  duplicateWorkflow,
  runWorkflow,
  scheduleWorkflow,
}: Props) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dar:shadow-primary/30 group/card">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <WorkFlowIcon
            isDraft={isDraft}
            statusColors={STATUS_COLORS[workflow.status as WorkflowStatus]}
          />
          <div>
            <div className="px-2 flex items-center">
              <h3 className="text-base font-bold text-muted-foreground ">
                <TooltipWrapper content={workflow.description!}>
                  <Link
                    href={`/workflow/editor/${workflow.id}`}
                    className="flex items-center hover:underline"
                  >
                    {workflow.name}
                  </Link>
                </TooltipWrapper>
                {isDraft && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Draft
                  </span>
                )}
              </h3>
              {duplicateWorkflow}
            </div>
            {!isDraft && scheduleWorkflow}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && runWorkflow}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} /> Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workFlowId={workflow.id}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

export default WorkFlowCard;
