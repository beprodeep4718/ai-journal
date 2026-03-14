import { analyzeJournal } from "../api/journalApi"
import { useState } from "react"

type Entry = {
 _id: string
 text: string
 ambience?: string
 emotion?: string
 summary?: string
}

type JournalListProps = {
 entries: Entry[]
 refresh: () => Promise<void>
}

export default function JournalList({ entries, refresh }: JournalListProps){

 const [loading,setLoading] = useState<string | null>(null)

 const analyze = async (entry: Entry) => {

   setLoading(entry._id)

   await analyzeJournal({
     text: entry.text,
     journalId: entry._id
   })

   setLoading(null)

   await refresh()
 }

 return (

  <div className="entries-section">

   <div className="section-head">
    <h2>Entries</h2>
    <span className="count-pill">{entries.length}</span>
   </div>

   {!entries.length && <p className="section-note">No entries yet. Save one above to get started.</p>}

   <div className="entries-list">

   {entries.map(e => (

     <article key={e._id} className="entry-card">

       <p className="entry-text">{e.text}</p>

       <div className="entry-meta-row">
        <span className="entry-chip">Ambience: {e.ambience || "n/a"}</span>
       </div>

       {e.emotion ? (
         <div className="entry-analysis">

           <p className="entry-emotion">Emotion: {e.emotion}</p>
           <p className="entry-summary">{e.summary}</p>

         </div>

       ) : (

         <button
           className="analyze-button"
           disabled={loading === e._id}
           onClick={()=>analyze(e)}
         >

           {loading === e._id
             ? "Analyzing..."
             : "Analyze"
           }

         </button>

       )}

     </article>

   ))}

   </div>

  </div>

 )
}