import React from "react";
//libs
import { CoinsIcon, CornerDownRightIcon, MoveRightIcon } from "lucide-react";
//components
import { Badge } from "@workspace/ui/components/badge";
import TooltipWrapper from "@/components/tooltip-wrapper";

type ScheduleWorkFlowWrapperProps = {
  creditsCost: number;
  children: React.ReactNode;
};

const ScheduleWorkFlowWrapper = ({
  creditsCost,
  children,
}: ScheduleWorkFlowWrapperProps) => {
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      {children}
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <Badge
            variant={"outline"}
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default ScheduleWorkFlowWrapper;
