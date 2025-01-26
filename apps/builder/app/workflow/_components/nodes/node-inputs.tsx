import React, { useMemo } from "react";
//libs
import { Handle, Position, useEdges } from "@xyflow/react";
import { cn } from "@workspace/ui/lib/utils";
//types
import { TaskParam } from "@/types/task";
//hooks
import useFlowValidation from "@/hooks/use-flow-validation";
//constants
import { ColorForHandle } from "@/constants/theme-constants";
//components
import NodeParamField from "./node-param-field";

type Props = {
  children: React.ReactNode;
};

export const NodeInputs = ({ children }: Props) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowValidation();

  const hasErrors = useMemo(
    () =>
      invalidInputs
        .find((node) => node.nodeId === nodeId)
        ?.inputs.includes(input.name),
    [invalidInputs, nodeId, input.name]
  );

  const edges = useEdges();
  const isConnected = useMemo(
    () =>
      edges.some(
        (edge) => edge.target === nodeId && edge.targetHandle === input.name
      ),
    [edges, nodeId, input.name]
  );
  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
