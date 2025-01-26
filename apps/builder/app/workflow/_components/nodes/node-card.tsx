"use client";

import React, { useMemo } from "react";
//libs
import { useReactFlow } from "@xyflow/react";
import { cn } from "@workspace/ui/lib/utils";
//hooks
import useFlowValidation from "@/hooks/use-flow-validation";

type Props = {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
};

const NodeCard = ({ children, isSelected, nodeId }: Props) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = useMemo(
    () => invalidInputs.some((input) => input.nodeId === nodeId),
    [invalidInputs, nodeId]
  );
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
