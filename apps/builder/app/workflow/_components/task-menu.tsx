"use client";
import React, { useMemo } from "react";
//libs
import { CoinsIcon } from "lucide-react";
//libs
import { TaskRegistry } from "@/lib/workflow/task/registry";
//types
import { TaskType } from "@/types/task";
//constants
import { TASK_CATEGORIES } from "../_constants";
//components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";

const TaskMenu = () => {
  const renderedAccordions = useMemo(
    () =>
      TASK_CATEGORIES.map((category) => (
        <AccordionItem key={category.value} value={category.value}>
          <AccordionTrigger className="font-bold">
            {category.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {category.tasks.map((taskType) => (
              <TaskMenuButton key={taskType} taskType={taskType} />
            ))}
          </AccordionContent>
        </AccordionItem>
      )),
    []
  );

  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={TASK_CATEGORIES.map((category) => category.value)}
      >
        {renderedAccordions}
      </Accordion>
    </aside>
  );
};

const TaskMenuButton = ({ taskType }: { taskType: TaskType }) => {
  const task = useMemo(() => TaskRegistry[taskType], [taskType]);

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", taskType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge className="flex items-center gap-1" variant="outline">
        <CoinsIcon size={16} />
        {task.credits}
      </Badge>
    </Button>
  );
};

export default TaskMenu;
