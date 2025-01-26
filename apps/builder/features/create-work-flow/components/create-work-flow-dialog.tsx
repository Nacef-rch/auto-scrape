import React from "react";
//libs
import { Layers2Icon } from "lucide-react";
//components
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

type Props = {
  open: boolean;
  triggerText?: string;
  formReset: () => void;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const CreateWorkflowDialog = ({
  open,
  triggerText,
  setOpen,
  formReset,
  children,
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        formReset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subtitle="Start Create your workflow"
        />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
