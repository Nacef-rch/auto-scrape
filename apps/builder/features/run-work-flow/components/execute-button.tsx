"use client";
import React from "react";
//libs
import { toast } from "sonner";
import { PlayIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
//actions
import { RunWorkflow } from "../actions/runWorkflow";
//hooks
import useExecutionPlan from "@/hooks/use-execution-plan";
//components
import { Button } from "@workspace/ui/components/button";

type Props = {
  workflowId: string;
};

const ExecuteButton = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: (error) => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          //Client side validation!
          return;
        }
        mutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteButton;
