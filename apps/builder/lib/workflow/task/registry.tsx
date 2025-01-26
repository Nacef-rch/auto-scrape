import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHtmlTask } from "./pageToHtml";
import { FillInputTask } from "./fillInput";
import { ClickElementTask } from "./clickElement";
import { WaitForElementTask } from "./waitForElement";
import { DeliverViaWebhookTask } from "./deliverViaWebhook";
import { ExtractDataWithAITask } from "./extractDataWithAI";
import { ReadPropertyFromJsonTask } from "./readPropertyFromJson";
import { AddPropertyFromJsonTask } from "./addPropertyFromJson";
import { NavigateUrlTask } from "./navigateUrl";
import { ScrollToElementTask } from "./scrollToElement";

//this means the type should be the same as the key in the registry
type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAITask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
  ADD_PROPERTY_TO_JSON: AddPropertyFromJsonTask,
  NAVIGATE_URL: NavigateUrlTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
};
