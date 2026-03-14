import { useState } from "react"
import { createJournal } from "../api/journalApi"
import "./JournalForm.css"

type JournalFormProps = {
 userId: string
 refresh: () => Promise<void>
}

export default function JournalForm({ userId, refresh }: JournalFormProps){

 const [text,setText] = useState("")
 const [ambience,setAmbience] = useState("forest")
 const [loading,setLoading] = useState(false)

 const submit = async () => {

   if(text.trim().length < 5){
     alert("Write at least 5 characters")
     return
   }

   setLoading(true)

   await createJournal({
     userId,
     ambience,
     text
   })

   setText("")
   setLoading(false)

   await refresh()
 }

 return (

  <div className="journal-card">

   <h2 className="journal-title">Write Journal</h2>

   <label className="journal-label" htmlFor="entry-text">Entry</label>

   <textarea
     id="entry-text"
     className="journal-textarea"
     value={text}
     onChange={(e)=>setText(e.target.value)}
     placeholder="Write your thoughts..."
   />

   <p className="journal-meta">{text.length} characters</p>

   <label className="journal-label" htmlFor="entry-ambience">Ambience</label>

   <select
     id="entry-ambience"
     className="journal-select"
     value={ambience}
     onChange={(e)=>setAmbience(e.target.value)}
   >

     <option value="forest">Forest</option>
     <option value="ocean">Ocean</option>
     <option value="mountain">Mountain</option>

   </select>

   <button className="journal-button" onClick={submit} disabled={loading || text.trim().length < 5}>
     {loading ? "Saving..." : "Save"}
   </button>

  </div>

 )
}