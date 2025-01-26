import React from "react";
//libs
import { ClockIcon, CoinsIcon } from "lucide-react";
import { DatesToDurationString } from "@/lib/helpers/dates";
import { ExecutionLog, ExecutionPhase } from "@workspace/db";
//components
import LogViewer from "./log-viewer";
import ParameterViewer from "./parameter-veiwer";
import { Badge } from "@workspace/ui/components/badge";

type Props = {
  phaseDetails: ExecutionPhase;
  logs: ExecutionLog[];
};

const ExecutionPhaseDetails = ({ phaseDetails, logs }: Props) => {
  return (
    <div className="flex flex-col py-4 container gap-4 overflow-auto">
      <div className="flex gap-2 items-center">
        <Badge variant={"outline"} className="space-x-4">
          <div className="flex gap-1 items-center">
            <CoinsIcon size={18} className="stroke-muted-foreground" />
            <span>Credits</span>
          </div>
          <span>{phaseDetails?.creditsConsumed}</span>
        </Badge>
        <Badge variant={"outline"} className="space-x-4">
          <div className="flex gap-1 items-center">
            <ClockIcon size={18} className="stroke-muted-foreground" />
            <span>Duration</span>
          </div>
          <span>
            {DatesToDurationString(
              phaseDetails?.completedAt,
              phaseDetails?.startedAt
            ) || "-"}
          </span>
        </Badge>
      </div>
      <ParameterViewer
        title="Inputs"
        subTitle="Inputs used for this phase"
        paramsJson={phaseDetails?.inputs}
      />
      <ParameterViewer
        title="Outputs"
        subTitle="Outputs generated bu this phase"
        paramsJson={phaseDetails?.outputs}
      />
      <LogViewer logs={logs} />
    </div>
  );
};

export default ExecutionPhaseDetails;
