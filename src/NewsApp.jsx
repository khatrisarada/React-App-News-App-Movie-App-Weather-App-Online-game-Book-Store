import { useState } from "react"
import Navbar from "./components/Navbar"
import { NewsArea } from "./components/NewsArea"


export const App = () => {
  const [category, setCategory]= useState("general")
  return (
    <div>
      <Navbar setCategory={setCategory}/>
      <NewsArea category={category} />
    </div>
  )
}
export default App
