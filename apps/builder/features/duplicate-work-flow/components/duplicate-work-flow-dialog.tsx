"use client";
import React from "react";
//libs
import { cn } from "@workspace/ui/lib/utils";
import { CopyIcon, Layers2Icon } from "lucide-react";
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
  formReset: () => void;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const DuplicateWorkflowDialog = ({
  open,
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
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100"
          )}
        >
          <CopyIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader icon={Layers2Icon} title="Duplicate workflow" />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateWorkflowDialog;
