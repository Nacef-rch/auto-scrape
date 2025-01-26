"use client";

import React, { useCallback, useState } from "react";
//libs
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//action
import { CreateWorkflowAction } from "./actions/createWorkFlow";
//schema
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
//components
import CreateWorkflowDialog from "./components/create-work-flow-dialog";
import CreateWorkFlowForm from "./components/create-work-flow-form";

type Props = {
  triggerText?: string;
};

const CreateWorkflow = ({ triggerText }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow created successfully", { id: "create-workflow" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
      setOpen(false);
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <CreateWorkflowDialog
      open={open}
      triggerText={triggerText}
      setOpen={setOpen}
      formReset={form.reset}
    >
      <CreateWorkFlowForm
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </CreateWorkflowDialog>
  );
};

export default CreateWorkflow;
