import React from "react";
//types
import { ExecutionPhaseStatus } from "@/types/workflow";
//components
import PhasesStatusBadge from "@/components/phases-status-badge";

type ExecutionStatusProps = {
  status?: ExecutionPhaseStatus;
};

const ExecutionStatus = ({ status }: ExecutionStatusProps) => {
  if (!status) return null;
  return (
    <div className="font-semibold capitalize flex gap-2 items-center">
      <PhasesStatusBadge status={status} />
      <span>{status}</span>
    </div>
  );
};

export default ExecutionStatus;
