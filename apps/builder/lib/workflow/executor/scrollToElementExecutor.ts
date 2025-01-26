import { ExecutionEnvironment } from "@/types/executor";
import { ScrollToElementTask } from "../task/scrollToElement";

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input selector is not defined");
    }
    //TODO : THIS IS NOT A TODO THIS IS JUST TO SHOW HOW TO EXECUTE JS IN THE EXECUTOR
    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error("Element not found");
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top });
    }, selector);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
