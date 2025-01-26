import React from "react";
//libs
import { cn } from "@workspace/ui/lib/utils";
//constants
import { EXECUTION_INDICATOR_COLORS } from "@/constants/theme-constants";
//types
import { ExecutionStatusProps } from "@/types/workflow";

const ExecutionStatusIndicator = ({ status }: ExecutionStatusProps) => {
  return (
    <div
      className={cn("w-2 h-2 rounded-full", EXECUTION_INDICATOR_COLORS[status])}
    />
  );
};

export default ExecutionStatusIndicator;
