"use client";

import React from "react";
import Link from "next/link";
//libs
import { Workflow } from "@workspace/db";
import { formatInTimeZone } from "date-fns-tz";
import { format, formatDistanceToNow } from "date-fns";
import { ChevronRightIcon, ClockIcon } from "lucide-react";
//types
import { WorkflowExecutionStatus, WorkflowStatus } from "@/types/workflow";
//components
import ExecutionStatusIndicator from "@/components/execution-status-indicator";
import ExecutionStatusLabel from "@/components/execution-status-label";

const LastRunDetails = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  if (isDraft) return null;

  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;

  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");

  const nextScheduleUTC =
    nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");

  return (
    <div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="flex items-center text-sm gap-2 group"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <span>{formattedStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] group-hover:translate-x-0 transition"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-sm">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
};

export default LastRunDetails;
