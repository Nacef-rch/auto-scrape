import React from "react";
import { useRouter } from "next/navigation";
//libs
import { CoinsIcon } from "lucide-react";
import type { WorkflowExecution } from "@workspace/db";
//types
import { WorkflowExecutionStatus } from "@/types/workflow";
//components
import { Badge } from "@workspace/ui/components/badge";
import { TableCell, TableRow } from "@workspace/ui/components/table";
import ExecutionStatusIndicator from "@/components/execution-status-indicator";

type ExecutionsTableRow = {
  duration: string | null;
  formattedStartedAt: string | null;
} & WorkflowExecution;

const ExecutionsTableRow = (props: ExecutionsTableRow) => {
  const router = useRouter();

  return (
    <TableRow
      key={props.id}
      className="cursor-pointer"
      onClick={() => {
        router.push(`/workflow/runs/${props.workflowId}/${props.id}`);
      }}
    >
      <TableCell>
        <div className="flex flex-col">
          <span className="font-semibold">{props.id}</span>
          <div className="text-muted-foreground text-xs">
            <span>Triggered via</span>
            <Badge variant={"outline"}>{props.trigger}</Badge>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <ExecutionStatusIndicator
              status={props.status as WorkflowExecutionStatus}
            />
            <span className="font-semibold capitalize">{props.status}</span>
          </div>
          <div className="text-muted-foreground text-xs mx-5">
            {props.duration}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <CoinsIcon size={16} className="text-primary" />
            <span className="font-semibold capitalize">
              {props.creditsConsumed}
            </span>
          </div>
          <div className="text-muted-foreground text-xs mx-5">Credits</div>
        </div>
      </TableCell>
      <TableCell className="text-right text-muted-foreground">
        {props.formattedStartedAt}
      </TableCell>
    </TableRow>
  );
};

export default ExecutionsTableRow;
