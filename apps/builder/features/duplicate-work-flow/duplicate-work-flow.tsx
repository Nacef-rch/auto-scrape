"use client";

import React, { useCallback, useState } from "react";
//libs
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//actions
import { DuplicateWorkflowAction } from "./actions/duplicateWorkflow";
//schemas
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from "@/schema/workflow";
//components
import DuplicateWorkFlowForm from "./components/duplicate-work-flow-form";
import DuplicateWorkflowDialog from "./components/duplicate-work-flow-dialog";

type Props = {
  workflowId: string;
};

const DuplicateWorkflow = ({ workflowId }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<duplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: DuplicateWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow duplicated", { id: "duplicate-workflow" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to duplicate workflow", { id: "duplicate-workflow" });
      setOpen(false);
    },
  });

  const onSubmit = useCallback(
    (values: duplicateWorkflowSchemaType) => {
      toast.loading("Duplicating workflow...", { id: "duplicate-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <DuplicateWorkflowDialog
      open={open}
      setOpen={setOpen}
      formReset={form.reset}
    >
      <DuplicateWorkFlowForm
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </DuplicateWorkflowDialog>
  );
};

export default DuplicateWorkflow;
