export interface JournalInput {
  userId: string
  ambience: "forest" | "ocean" | "mountain"
  text: string
}

export interface EmotionAnalysis {
  emotion: string
  keywords: string[]
  summary: string
}