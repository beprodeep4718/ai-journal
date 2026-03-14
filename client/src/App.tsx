import { useCallback, useEffect, useState } from "react"

import useUserId from "./hooks/useUserId"

import JournalForm from "./components/JournalForm"
import JournalList from "./components/JournalList"
import Insights from "./components/Insights"

import { getEntries, getInsights } from "./api/journalApi"

type Entry = {
 _id: string
 text: string
 ambience?: string
 emotion?: string
 summary?: string
}

type InsightData = {
 totalEntries: number
 topEmotion: string
 mostUsedAmbience: string
 recentKeywords: string[]
}

export default function App(){

 const userId = useUserId()

 const [entries,setEntries] = useState<Entry[]>([])
 const [insights,setInsights] = useState<InsightData | null>(null)

 const refresh = useCallback(async () => {
   const [entriesRes, insightsRes] = await Promise.all([
    getEntries(userId),
    getInsights(userId)
   ])

   setEntries(entriesRes.data)
   setInsights(insightsRes.data)
 }, [userId])

 useEffect(()=>{
   const timeoutId = window.setTimeout(() => {
    void refresh()
   }, 0)

   return () => window.clearTimeout(timeoutId)
 },[refresh])

 return(

  <div className="app-shell">
   <header className="hero">
    <p className="hero-kicker">Reflect. Analyze. Improve.</p>
    <h1 className="hero-title">AI Journal</h1>
    <p className="hero-subtitle">
     Build a consistent journaling habit and reveal emotional trends with one click.
    </p>
   </header>

   <main className="dashboard-grid">
    <section className="panel form-panel">
     <JournalForm
      userId={userId}
      refresh={refresh}
     />
    </section>

    <section className="panel list-panel">
     <JournalList
      entries={entries}
      refresh={refresh}
     />
    </section>

    <section className="panel insights-panel">
     <Insights
      insights={insights}
     />
    </section>
   </main>
  </div>

 )

}