import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LodoBoard from "./LodoBoard"
import TodoList from "./TodoList"
import Lottery from './Lottery'
import { sum } from "./helper"


function App() {
  
  let winCondition = (ticket) => {
    return sum(ticket) === 15;
  }

  return (
    <>
      <Lottery n={3} winCondition={winCondition} />
    </>
  )
}

export default App
