import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/navigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error("input url is not defined");
    }
    //TODO : WE CAN EXTANT THE CLICK ELEMENT TASK WITH HOW MANY TIMES WE CLICK / DELAY STUFF LIKE THAT IN THE OBJECT IN THE 2 PARAM IN THE CLICK
    await environment.getPage()!.goto(url);
    environment.log.info(`Navigated to ${url}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
