import { AddPropertyFromJsonTask } from "../task/addPropertyFromJson";
import { ExecutionEnvironment } from "@/types/executor";

export async function AddPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input json is not defined");
    }
    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("input Property name is not defined");
    }
    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("input Property name is not defined");
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;
    environment.setOutput("Updated JSON", JSON.stringify(json));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
