import React from "react";
//libs
import {
  CircleCheckIcon,
  CircleDashed,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";
//types
import { ExecutionPhaseStatus } from "@/types/workflow";

type Props = {
  status: ExecutionPhaseStatus;
};

const ICON_SIZE = 20;

const ICON_CLASSES: Record<ExecutionPhaseStatus, string> = {
  [ExecutionPhaseStatus.PENDING]: "stroke-muted-foreground",
  [ExecutionPhaseStatus.RUNNING]: "animate-spin stroke-yellow-500",
  [ExecutionPhaseStatus.FAILED]: "stroke-destructive",
  [ExecutionPhaseStatus.COMPLETED]: "stroke-green-500",
  [ExecutionPhaseStatus.CREATED]: "stroke-blue-500",
};

const ICONS: Record<ExecutionPhaseStatus, React.ElementType> = {
  [ExecutionPhaseStatus.PENDING]: CircleDashed,
  [ExecutionPhaseStatus.RUNNING]: Loader2Icon,
  [ExecutionPhaseStatus.FAILED]: CircleXIcon,
  [ExecutionPhaseStatus.COMPLETED]: CircleCheckIcon,
  [ExecutionPhaseStatus.CREATED]: CircleDashed,
};

const PhasesStatusBadge = ({ status }: Props) => {
  const Icon = ICONS[status];
  return Icon ? (
    <Icon size={ICON_SIZE} className={ICON_CLASSES[status]} />
  ) : (
    <div className="rounded-full text-muted-foreground">{status}</div>
  );
};

export default PhasesStatusBadge;
