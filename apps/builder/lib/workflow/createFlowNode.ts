import { AppNode, NodePosition } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: NodePosition
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
