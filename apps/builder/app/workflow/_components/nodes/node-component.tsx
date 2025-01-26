import { memo } from "react";
//libs
import { NodeProps } from "@xyflow/react";
import { TaskRegistry } from "@/lib/workflow/task/registry";
//types
import { AppNodeData } from "@/types/appNode";
//components
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { NodeInput, NodeInputs } from "./node-inputs";
import { Badge } from "@workspace/ui/components/badge";
import { NodeOutput, NodeOutputs } from "./node-outputs";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      {DEV_MODE && <Badge>DEV:{id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={id} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={`${input.name}-${index}`} nodeId={id} input={input} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((input, index) => (
          <NodeOutput key={`${input.name}-${index}`} output={input} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
