"use client";
import React, { useCallback, useEffect } from "react";
//Graph
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  addEdge,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
//database
import { Workflow } from "@workspace/db";
//libs
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
//types
import { TaskType } from "@/types/task";
import { AppNode } from "@/types/appNode";
//components
import NodeComponent from "./nodes/node-component";
import DeletableEdge from "./edges/deletable-edge";

type Props = {
  workflow: Workflow;
  isSmoothDragging?: boolean;
};

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

//to make the drag a bit snappy
const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {
  padding: 1,
};

const FlowEditor = ({ workflow, isSmoothDragging = true }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      //to use the last view port you have to comment fitView in the ReactFlow
      // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      // setViewport({ x, y, zoom });
    } catch (e) {
      console.log(e);
    }
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === undefined || !type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const node = CreateFlowNode(type as TaskType, position);
      setNodes((nodes) => [...nodes, node]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges));
      if (!connection.targetHandle) return;
      //Remove input value if is present on connection
      const node = nodes.find((node) => node.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self-connections allowed
      if (connection.source === connection.target) return false;

      //Same task Param Type connection (input / output have same type)
      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!target || !source) {
        console.error("Invalid connection: source or target node not found");
        return false;
      }
      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle
      );

      if (input?.type !== output?.type) {
        console.error(
          "Invalid connection: input and output types do not match"
        );
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);
      return !detectedCycle;
    },
    [nodes, edges]
  );

  return (
    <main className="f-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        //related to first load view fit
        fitView
        fitViewOptions={fitViewOptions}
        //related to the drag movement
        snapToGrid={!isSmoothDragging}
        snapGrid={snapGrid}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
