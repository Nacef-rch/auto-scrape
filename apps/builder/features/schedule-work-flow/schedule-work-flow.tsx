"use client";
import React, { useEffect, useState } from "react";
//libs
import { toast } from "sonner";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import { cn } from "@workspace/ui/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";
//actions
import { updateWorkflowCron } from "./actions/updateWorkflowCron";
import { RemoveWorkflowSchedule } from "./actions/removeWorkflowSchedule";
//components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import CustomDialogHeader from "@/components/custom-dialog-header";
import ScheduleWorkFlowWrapper from "./components/schedule-work-flow-wrapper";

type ScheduleWorkFlowProps = {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cron: string | null;
};

const ScheduleWorkFlow = ({
  isDraft,
  creditsCost,
  workflowId,
  ...rest
}: ScheduleWorkFlowProps) => {
  const [cron, setCron] = useState(rest.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const updateCronMutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const parsedCron = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(parsedCron);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = rest.cron && rest.cron.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronstrue.toString(rest.cron!);

  return (
    <ScheduleWorkFlowWrapper creditsCost={creditsCost}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"link"}
            size={"sm"}
            className={cn(
              "text-sm p-0 h-auto text-orange-500",
              workflowHasValidCron && "text-primary"
            )}
          >
            {workflowHasValidCron && (
              <div className="flex items-center gap-2">
                <ClockIcon />
                {readableSavedCron}
              </div>
            )}
            {!workflowHasValidCron && (
              <div className="flex items-center gap-1">
                <TriangleAlertIcon className="h-3 w-3" /> Set schedule
              </div>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="px-0">
          <CustomDialogHeader
            title="Schedule workflow execution"
            icon={CalendarIcon}
          />
          <div className="p-6 space-y-4">
            <p className="text-muted-foreground text-sm">
              Specify a cron expression to schedule periodic workflow execution.
              All times are in UTC.
            </p>
            <Input
              placeholder="E.g. * * * * *"
              value={cron}
              onChange={(e) => setCron(e.target.value)}
            />
            <div
              className={cn(
                "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
                validCron && "border-primary text-primary"
              )}
            >
              {validCron ? readableCron : "Invalid cron expression"}
            </div>
            {workflowHasValidCron && (
              <DialogClose asChild>
                <>
                  <Button
                    variant={"outline"}
                    disabled={
                      updateCronMutation.isPending ||
                      removeScheduleMutation.isPending
                    }
                    className="w-full text-destructive border-destructive hover:text-destructive"
                    onClick={() => {
                      toast.loading("Removing schedule...", { id: "cron" });
                      removeScheduleMutation.mutate(workflowId);
                    }}
                  >
                    Remove current schedule
                  </Button>
                  <Separator className="my-4" />
                </>
              </DialogClose>
            )}
          </div>
          <DialogFooter className="px-6 gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full"
                disabled={updateCronMutation.isPending || !validCron}
                onClick={() => {
                  toast.loading("Updating schedule...", { id: "cron" });
                  updateCronMutation.mutate({ id: workflowId, cron });
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScheduleWorkFlowWrapper>
  );
};

export default ScheduleWorkFlow;
