/** Documentation File path: src/lib/openai.ts
1. This file sets up and exports an OpenAI client instance for use in the application.
2. It reads the API key from environment variables to ensure secure access.
3. Make sure to set the OPENAI_API_KEY in your environment before running the application.
4. Any API route can just <import { openaiClient } from "@/lib/openai";> to refer this library.
**/

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  // This helps catch mistakes early in dev
  throw new Error("OPENAI_API_KEY is not set in environment variables.");
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
