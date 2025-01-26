import { GetWorkflowExecutionWithPhases } from "@/features/execution-viewer/actions/getWorkflowExecutionWithPhases";

export type ExecutionData = Awaited<
  ReturnType<typeof GetWorkflowExecutionWithPhases>
>;
