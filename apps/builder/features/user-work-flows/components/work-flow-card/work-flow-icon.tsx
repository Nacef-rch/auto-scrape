import React from "react";
//libs
import { cn } from "@workspace/ui/lib/utils";
import { FileTextIcon, PlayIcon } from "lucide-react";

type Props = {
  isDraft: boolean;
  statusColors: string;
};

const WorkFlowIcon = ({ isDraft, statusColors }: Props) => {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        statusColors
      )}
    >
      {isDraft ? (
        <FileTextIcon className="h-5 w-5" />
      ) : (
        <PlayIcon className="h-5 w-5 text-white" />
      )}
    </div>
  );
};

export default WorkFlowIcon;
