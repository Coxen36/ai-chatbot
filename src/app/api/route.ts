/*
Documentation File path: src/app/api/route.ts
1. This file defines an API route that handles POST requests to interact with the OpenAI API.
2. It expects a JSON body containing messages and an optional model name.
3. The route uses the OpenAI client from src/lib/openai.ts to generate chat completions.
4. Make sure to handle errors gracefully and return appropriate HTTP status codes.
5. Reusebale for anything that uses OpenAI chat completions.
*/

import { openaiClient } from "@/lib/openai";

type Role = "system" | "user" | "assistant";

interface ApiMessage {
  role: Role;
  content: string;
}

interface AiRequestBody {
  messages: ApiMessage[];
  model?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AiRequestBody;

    const { messages, model = "gpt-4o-mini" } = body;

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const response = await openaiClient.chat.completions.create({
      model,
      messages,
    });

    const reply = response.choices[0]?.message?.content ?? "";

    return Response.json({ reply });
  } catch (error) {
    console.error("AI API error:", error);
    return new Response("Error processing AI request", { status: 500 });
  }
}
