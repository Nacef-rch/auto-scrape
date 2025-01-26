import type { Config } from "tailwindcss";
import sharedConfig from "@workspace/ui/tailwind.config";

const config: Pick<Config, "content" | "presets"> = {
  presets: [sharedConfig],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./core/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
  ],
};

export default config;
