import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from "./Counter"
import LikeButton  from './LikeButton'

function App() {
 return (
    <>
      <h1>States in React</h1>
      <Counter></Counter>
      <LikeButton></LikeButton>
    </>
 )
}

export default App
