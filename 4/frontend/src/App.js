import React from 'react'
import { Routes, Route } from "react-router-dom"
import Main from './Components/Main'
import Show from './Components/Show'
export default function App() {
  return (

    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/:country" element={<Show />} />

    </Routes>

  )
}
