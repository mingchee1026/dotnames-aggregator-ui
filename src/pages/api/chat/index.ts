import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export const runtime = "edge";

export default async function handler(req: Request) {
  const { messages } = await req.json();

  const userPrompt = messages[messages.length - 1];
  const systemPrompt = {
    role: "system",
    content:
      "You have to generate 10 unique domain names for a user. Decline politely if the user requests something irrelevant than domain suggestion or inappropriate. If user asks irrelevant question or prompt then don't generate domain name. Remember you are suggesting domain names related to noun. Tailor them with short, catchy, and memorable names. Don't give any explanation and you shouldn't put any irrelevant suffix and TLD. Just 10 suggested domain names without TLDs. For example, user input a noun then tailor suggestions which includes that noun.",
  };
  const prompt = [systemPrompt, userPrompt];

  const response = await fireworks.chat.completions.create({
    model: "accounts/fireworks/models/llama-v2-70b-chat",
    stream: true,
    max_tokens: 200,
    messages: prompt,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
