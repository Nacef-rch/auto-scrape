"use client";

import React from "react";
//libs
import { toast } from "sonner";
import { DownloadIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
//actions
import { UnpublishWorkflow } from "@/features/user-work-flows/actions/unpublishWorkflow";
//components
import { Button } from "@workspace/ui/components/button";

type Props = {
  workflowId: string;
};

const UnPublishButton = ({ workflowId }: Props) => {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
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
        toast.loading("Unpublishing workflow...", { id: workflowId });
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
};

export default UnPublishButton;
