"use client";

import React, { useEffect, useState } from "react";
//libs
import {
  CalendarIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  WorkflowIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ExecutionLog, ExecutionPhase } from "@workspace/db";
import { DatesToDurationString } from "@/lib/helpers/dates";
import { GetPhasesTotalCost } from "@/lib/helpers/phases";
//actions
import { GetWorkflowExecutionWithPhases } from "./actions/getWorkflowExecutionWithPhases";
import { GetWorkflowPhaseDetails } from "./actions/getWorkflowPhaseDetails";
//types
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow";
import { ExecutionData } from "./types";
//components
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import ExecutionLabel from "./components/execution-label";
import ExecutionStatus from "./components/execution-status";
import NoPhaseSelected from "./components/no-phase-selected";
import { Separator } from "@workspace/ui/components/separator";
import ExecutionPhaseDetails from "./components/phase-details";
import PhasesStatusBadge from "../../components/phases-status-badge";
import ReactCountUpWrapper from "@/components/react-count-up-wrapper";

type Props = {
  initialData: ExecutionData;
};

const ExecutionViewer = ({ initialData }: Props) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase, query.data?.status],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    //While running we auto-select the current running phase in the sidebar
    const phases = query.data?.phases || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];

      setSelectedPhase(phaseToSelect.id);
      return;
    }

    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0]; //last completed phase
    setSelectedPhase(phaseToSelect.id);
  }, [query.data?.phases, isRunning, setSelectedPhase]);

  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt
  );
  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);
  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          {[
            {
              icon: Loader2Icon,
              label: "Status",
              value: (
                <ExecutionStatus
                  status={query.data?.status as ExecutionPhaseStatus}
                />
              ),
            },
            {
              icon: CalendarIcon,
              label: "Started At",
              value: query.data?.startedAt
                ? formatDistanceToNow(new Date(query.data?.startedAt), {
                    addSuffix: true,
                  })
                : "-",
            },
            {
              icon: ClockIcon,
              label: "Duration",
              value: duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              ),
            },
            {
              icon: CoinsIcon,
              label: "Credits Consumed",
              value: <ReactCountUpWrapper value={creditsConsumed} />, // Replace with actual calculated value
            },
          ].map(({ icon, label, value }, index) => (
            <ExecutionLabel
              key={index}
              icon={icon}
              label={label}
              value={value}
            />
          ))}
        </div>
        <Separator />
        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
            >
              <div className="flex items-center gap-2">
                <Badge variant={"outline"}>{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <PhasesStatusBadge
                status={phase.status as ExecutionPhaseStatus}
              />
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in progress, please wait</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <NoPhaseSelected
            title="No phase selected"
            description="Please select a phase to view details"
          />
        )}
        {!isRunning && selectedPhase && (
          <ExecutionPhaseDetails
            phaseDetails={phaseDetails.data as ExecutionPhase}
            logs={phaseDetails.data?.logs as ExecutionLog[]}
          />
        )}
      </div>
    </div>
  );
};

export default ExecutionViewer;
