"use client";
import React from "react";
//libs
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
//hooks
import { UpdateWorkflow } from "@/features/user-work-flows/actions/updateWorkFlow";
//components
import { Button } from "@workspace/ui/components/button";

type Props = {
  workflowId: string;
};
//TODO : add autosave !!
const SaveButton = ({ workflowId }: Props) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "save-workflow" });
    },
  });
  return (
    <Button
      disabled={saveMutation.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      {saveMutation.isPending && <Loader2 className="animate-spin" />}
      {!saveMutation.isPending && (
        <CheckIcon size={16} className="stroke-green-400" />
      )}
      Save
    </Button>
  );
};

export default SaveButton;
