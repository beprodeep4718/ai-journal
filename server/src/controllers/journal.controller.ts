import { Request, Response } from "express";
import Journal from "../models/journal.model";
import { analyzeEmotion } from "../services/llm.service";

export const createJournal = async (req: Request, res: Response) => {
  const { userId, ambience, text } = req.body;

  const entry = await Journal.create({
    userId,
    ambience,
    text,
  });

  res.json(entry);
};

export const getEntries = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const entries = await Journal.find({ userId }).sort({ createdAt: -1 });

  res.json(entries);
};

export const analyzeJournal = async (req: Request, res: Response) => {
  const { journalId, text } = req.body;
  if (!text) {
    return res.status(400).json({
      error: "text is required",
    });
  }

  const result = await analyzeEmotion(text);
  console.log("Emotion Analysis Result:", result);
  await Journal.findByIdAndUpdate(journalId, {
    emotion: result.emotion,
    keywords: result.keywords,
    summary: result.summary,
  });

  res.json(result);
};

export const getInsights = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const entries = await Journal.find({ userId });

  const totalEntries = entries.length;

  const emotionCount: Record<string, number> = {};
  const ambienceCount: Record<string, number> = {};

  let keywords: string[] = [];

  entries.forEach((e) => {
    if (e.emotion) {
      emotionCount[e.emotion] = (emotionCount[e.emotion] || 0) + 1;
    }

    if (e.ambience != null) {
      ambienceCount[e.ambience] = (ambienceCount[e.ambience] || 0) + 1;
    }

    if (e.keywords) {
      keywords.push(...e.keywords);
    }
  });

  const topEmotion = Object.keys(emotionCount).sort(
    (a, b) => emotionCount[b] - emotionCount[a],
  )[0];

  const mostUsedAmbience = Object.keys(ambienceCount).sort(
    (a, b) => ambienceCount[b] - ambienceCount[a],
  )[0];

  res.json({
    totalEntries,
    topEmotion,
    mostUsedAmbience,
    recentKeywords: keywords.slice(-5),
  });
};
