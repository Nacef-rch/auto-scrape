"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
//components
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

type Props = {
  workflowId: string;
};

const NavigationTabs = ({ workflowId }: Props) => {
  const pathname = usePathname();
  const activeValue = pathname.split("/")[2];

  return (
    <Tabs value={activeValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger value="editor" className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/workflow/runs/${workflowId}`}>
          <TabsTrigger value="runs" className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
