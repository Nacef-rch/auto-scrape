"use client";
import React from "react";
import { useRouter } from "next/navigation";
//libs
import { ChevronLeftIcon } from "lucide-react";
//components
import SaveButton from "./save-button";
import PublishButton from "./publish-button";
import NavigationTabs from "./navigation-tabs";
import UnPublishButton from "./unpublish-button";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@workspace/ui/components/button";
import ExecuteButton from "../../../../features/run-work-flow/components/execute-button";

type Props = {
  title: string;
  workflowId: string;
  subtitle?: string;
  hideButtons?: boolean;
  isPublished?: boolean;
};

const TopBar = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex gap-1 flex-1 justify-end">
        {!hideButtons && (
          <>
            <ExecuteButton workflowId={workflowId} />
            {isPublished && <UnPublishButton workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveButton workflowId={workflowId} />
                <PublishButton workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
