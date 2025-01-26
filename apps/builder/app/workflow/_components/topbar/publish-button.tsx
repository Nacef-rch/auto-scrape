"use client";
import React from "react";
//libs
import { toast } from "sonner";
import { UploadIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
//hooks
import useExecutionPlan from "@/hooks/use-execution-plan";
//components
import { Button } from "@workspace/ui/components/button";
import { PublishWorkflow } from "@/features/user-work-flows/actions/publishWorkflow";

type Props = {
  workflowId: string;
};

const PublishButton = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published", { id: workflowId });
    },
    onError: (error) => {
      toast.error("Something went wrong", { id: workflowId });
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
        toast.loading("Publishing workflow...", { id: workflowId });
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
};

export default PublishButton;
