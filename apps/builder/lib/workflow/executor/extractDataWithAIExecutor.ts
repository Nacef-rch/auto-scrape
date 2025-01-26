//libs
import OpenAi from "openai";
import { prisma } from "@workspace/db";
import { symmetricDecrypt } from "@/lib/encryption";
//types
import { ExecutionEnvironment } from "@/types/executor";
//tasks
import { ExtractDataWithAITask } from "../task/extractDataWithAI";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("credentials is not defined");
    }
    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("prompt is not defined");
    }
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("content is not defined");
    }

    //Get credentials from DB
    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });

    if (!credential) {
      environment.log.error("credentials not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("cannot decrypt credentials");
      return false;
    }

    const openAi = new OpenAi({
      apiKey: plainCredentialValue,
    });

    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a web scraper helper that extracts data from HTML or text. " +
            "you will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. " +
            "the response should always be only the extracted data as a JSON array or object, without any additional words or explanations. " +
            "Analyze the input carefully and extract data precisely based on the prompt. " +
            "If no data is found, return an empty JSON array. " +
            "Work only with the provided content and ensure that output is always a valid JSON array without any surrounding text.",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content;
    if (!result) {
      environment.log.error("Empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
