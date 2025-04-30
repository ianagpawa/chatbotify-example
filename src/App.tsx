import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MyChatBot } from './MyChatbot'
import { Grid } from './Grid'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div style={{ width: "50vw", height:" 50vh" }} >
     <Grid />
     <MyChatBot/>
   </div>
  )
}

export default App
