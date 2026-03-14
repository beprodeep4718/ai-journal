type InsightsData = {
 totalEntries: number
 topEmotion: string
 mostUsedAmbience: string
 recentKeywords: string[]
}

type InsightsProps = {
 insights: InsightsData | null
}

export default function Insights({ insights }: InsightsProps){
 if(!insights){
  return (
   <div className="insights-section">
    <h2>Insights</h2>
    <p className="section-note">No insights yet.</p>
   </div>
  )
 }

 return(
  <div className="insights-section">
   <h2>Insights</h2>

   <div className="insights-grid">
    <article className="insight-stat">
     <span className="insight-label">Total Entries</span>
     <strong>{insights.totalEntries}</strong>
    </article>
    <article className="insight-stat">
     <span className="insight-label">Top Emotion</span>
     <strong>{insights.topEmotion || "n/a"}</strong>
    </article>
    <article className="insight-stat">
     <span className="insight-label">Most Used Ambience</span>
     <strong>{insights.mostUsedAmbience || "n/a"}</strong>
    </article>
   </div>

   <div className="keywords-block">
    <p className="insight-label">Recent Keywords</p>
    <div className="keywords-list">
     {insights.recentKeywords?.length
      ? insights.recentKeywords.map((item) => (
       <span className="keyword-chip" key={item}>{item}</span>
      ))
      : <p className="section-note">none</p>}
    </div>
   </div>
  </div>
 )
}