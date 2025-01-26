import { TaskType } from "@/types/task";

export const INTERACTIONS_TASKS = [
  TaskType.NAVIGATE_URL,
  TaskType.FILL_INPUT,
  TaskType.CLICK_ELEMENT,
  TaskType.SCROLL_TO_ELEMENT,
];

export const EXTRACTION_TASKS = [
  TaskType.PAGE_TO_HTML,
  TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  TaskType.EXTRACT_DATA_WITH_AI,
];

export const STORAGE_TASKS = [
  TaskType.READ_PROPERTY_FROM_JSON,
  TaskType.ADD_PROPERTY_TO_JSON,
];

export const TIMING_TASKS = [TaskType.WAIT_FOR_ELEMENT];

export const RESULTS_TASKS = [TaskType.DELIVER_VIA_WEBHOOK];

export const TASK_CATEGORIES = [
  {
    title: "User interactions",
    value: "interactions",
    tasks: INTERACTIONS_TASKS,
  },
  {
    title: "Data extraction",
    value: "extraction",
    tasks: EXTRACTION_TASKS,
  },
  {
    title: "Data storage",
    value: "storage",
    tasks: STORAGE_TASKS,
  },
  {
    title: "Timing controls",
    value: "timing",
    tasks: TIMING_TASKS,
  },
  {
    title: "Result delivery",
    value: "results",
    tasks: RESULTS_TASKS,
  },
];
