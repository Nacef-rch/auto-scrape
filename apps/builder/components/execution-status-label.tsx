//libs
import { cn } from "@workspace/ui/lib/utils";
//types
import { ExecutionStatusProps } from "@/types/workflow";
//constants
import { EXECUTION_LABEL_COLORS } from "@/constants/theme-constants";

const ExecutionStatusLabel = ({ status }: ExecutionStatusProps) => {
  return (
    <span className={cn("lowercase", EXECUTION_LABEL_COLORS[status])}>
      {status}
    </span>
  );
};

export default ExecutionStatusLabel;
