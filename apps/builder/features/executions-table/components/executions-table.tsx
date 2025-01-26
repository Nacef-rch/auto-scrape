"use client";
import React from "react";
//libs
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { DatesToDurationString } from "@/lib/helpers/dates";
//actions
import { GetWorkflowExecutions } from "@/features/executions-table/actions/getWorkflowExecutions";
//components
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import ExecutionsTableRow from "./executions-table-row";
import ExecutionTableHeader from "./execution-table-header";

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

type Props = {
  workflowId: string;
  initialData: InitialDataType;
};

export const ExecutionsTable = ({ workflowId, initialData }: Props) => {
  const query = useQuery({
    queryKey: ["executions", workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  });
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <ExecutionTableHeader />
        <TableBody className="gap-2 h-full overflow-auto">
          {query.data.map((execution) => {
            const duration = DatesToDurationString(
              execution.completedAt,
              execution.startedAt
            );
            const formattedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(execution.startedAt, {
                addSuffix: true,
              });
            return (
              <ExecutionsTableRow
                key={execution.id}
                {...execution}
                duration={duration}
                formattedStartedAt={formattedStartedAt}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
