"use client";
import React, { ReactNode } from "react";
//components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

type Props = {
  children: ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
};

const TooltipWrapper = (props: Props) => {
  if (!props.content) return props.children;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
