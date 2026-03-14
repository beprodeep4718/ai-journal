import axios from "axios"

type CreateJournalPayload = {
 userId: string
 ambience: string
 text: string
}

type AnalyzeJournalPayload = {
 text: string
 journalId: string
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
})

export const createJournal = (data: CreateJournalPayload) =>
  api.post("/journal", data)

export const getEntries = (userId: string) =>
  api.get(`/journal/${userId}`)

export const analyzeJournal = (data: AnalyzeJournalPayload) =>
  api.post("/journal/analyze", data)

export const getInsights = (userId: string) =>
  api.get(`/journal/insights/${userId}`)