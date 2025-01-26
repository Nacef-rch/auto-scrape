import { TaskParamType } from "@/types/task";
import { WorkflowExecutionStatus, WorkflowStatus } from "@/types/workflow";

export const STATUS_COLORS = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

export const EXECUTION_INDICATOR_COLORS: Record<
  WorkflowExecutionStatus,
  string
> = {
  PENDING: "bg-state-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
  COMPLETED: "bg-emerald-600",
};

export const EXECUTION_LABEL_COLORS: Record<WorkflowExecutionStatus, string> = {
  PENDING: "text-state-400",
  RUNNING: "text-yellow-400",
  FAILED: "text-red-400",
  COMPLETED: "text-emerald-600",
};

export const APP_THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const ColorForHandle: Record<TaskParamType, string> = {
  BROWSER_INSTANCE: "!bg-sky-400",
  STRING: "!bg-amber-400",
  SELECT: "!bg-rose-400",
  CREDENTIAL: "!bg-teal-400",
};
