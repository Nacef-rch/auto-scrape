import { TaskType } from "@/types/task";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { LaunchBrowserExecutor } from "./launchBrowserExecutor";
import { PageToHtmlExecutor } from "./pageToHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./extractTextFromElementExecutor";
import { FillInputExecutor } from "./fillInputExecutor";
import { ClickElementExecutor } from "./clickElementExecutor";
import { WaitForElementExecutor } from "./waitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./deliverViaWebhookExecutor";
import { ExtractDataWithAIExecutor } from "./extractDataWithAIExecutor";
import { ReadPropertyFromJsonExecutor } from "./readPropertyFromJsonExecutor";
import { AddPropertyFromJsonExecutor } from "./addPropertyFromJsonExecutor";
import { NavigateUrlExecutor } from "./navigateUrlExecutor";
import { ScrollToElementExecutor } from "./scrollToElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [k in TaskType]: ExecutorFn<WorkflowTask & { type: k }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
  ADD_PROPERTY_TO_JSON: AddPropertyFromJsonExecutor,
  NAVIGATE_URL: NavigateUrlExecutor,
  SCROLL_TO_ELEMENT: ScrollToElementExecutor,
};
