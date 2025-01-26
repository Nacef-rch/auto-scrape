"use client";
import React from "react";
//libs
import { toast } from "sonner";
import { PlayIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
//actions
import { RunWorkflow } from "../actions/runWorkflow";
//components
import { Button } from "@workspace/ui/components/button";

type Props = {
  workflowId: string;
};

const RunButton = ({ workflowId }: Props) => {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
};

export default RunButton;
