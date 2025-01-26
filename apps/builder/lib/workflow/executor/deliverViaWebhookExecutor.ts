import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/deliverViaWebhook";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("input targetUrl is not defined");
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("input body is not defined");
    }
    //TODO : WE CAN MAKE THE HEADERS DYNAMIC
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const statusCode = response.status;
    if (statusCode !== 200) {
      environment.log.error(`Delivery failed with status code ${statusCode}`);
      return false;
    }
    const responseBody = await response.json();
    environment.log.info(
      `Delivery successful with response ${JSON.stringify(responseBody)}`
    );
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
