import { Groq } from "groq-sdk";
import { EmotionAnalysis } from "../types/journal";
import { redisClient } from "../config/redis";
import { hashText } from "../utils/hash";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeEmotion = async (
  text: string,
): Promise<EmotionAnalysis> => {
  const cacheKey = `journal-analysis:${hashText(text)}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("Cache hit");
    return JSON.parse(cached);
  }

  console.log("Calling Groq LLM");

  const prompt = `
You are an emotion analysis API.

Analyze the journal entry.

Return ONLY valid JSON in this format:

{
"emotion": "",
"keywords": [],
"summary": ""
}

Journal:
${text}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_completion_tokens: 300,
  });

  const output = completion.choices[0].message.content || "";

  const jsonMatch = output.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid JSON from LLM");
  }

  const result = JSON.parse(jsonMatch[0]);

  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 86400 });

  return result;
};
