import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/waitForElement";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input selector is not defined");
    }
    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("input visibility is not defined");
    }
    //TODO : if we want the wait time to be editable we can add an input in the task and read value from there and add the timeout option
    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });
    environment.log.info(`Element ${selector} became: ${visibility}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
