import { LaunchBrowserTask } from "./../task/launchBrowser";
import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";

//TODO : ADD headless : false // if the dev debug in .env ios true kima fel status for nodes
export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch({
      headless: false, // for testing to show the browser and what puppeteer is doing
    });
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl); // here we work only with one page
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
