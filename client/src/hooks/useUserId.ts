import { useState } from "react"

export default function useUserId(){

 const [userId] = useState(()=>{

   let id = localStorage.getItem("arvyax_uid")

   if(!id){
     id = "user_" + Math.random().toString(36).slice(2,9)
     localStorage.setItem("arvyax_uid", id)
   }

   return id

 })

 return userId

}