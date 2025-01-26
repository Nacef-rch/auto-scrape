"use client";
import React from "react";
//libs
import { Workflow } from "@workspace/db";
import { ReactFlowProvider } from "@xyflow/react";
//context
import { FlowValidationProvider } from "@/context/flow-validation-context";
//types
import { WorkflowStatus } from "@/types/workflow";
//component
import TaskMenu from "./task-menu";
import TopBar from "./topbar/top-bar";
import FlowEditor from "./flow-editor";

type EditorProps = {
  workflow: Workflow;
};

const Editor = ({ workflow }: EditorProps) => {
  return (
    <FlowValidationProvider>
      <ReactFlowProvider>
        <TopBar
          title="Workflow Editor"
          subtitle={workflow.name}
          workflowId={workflow.id}
          isPublished={workflow.status === WorkflowStatus.PUBLISHED}
        />
        <div className="flex flex-col h-full w-full overflow-hidden">
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationProvider>
  );
};

export default Editor;
