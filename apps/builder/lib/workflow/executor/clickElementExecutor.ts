import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/clickElement";

export async function ClickElementExecutor(
  environment: ExecutionEnvironment<typeof ClickElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input selector is not defined");
    }
    //TODO : WE CAN EXTANT THE CLICK ELEMENT TASK WITH HOW MANY TIMES WE CLICK / DELAY STUFF LIKE THAT IN THE OBJECT IN THE 2 PARAM IN THE CLICK
    await environment.getPage()!.click(selector);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
