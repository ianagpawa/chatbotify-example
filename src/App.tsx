import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBot from "react-chatbotify";

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChatBot/>
  )
}

export default App
