import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ApiData from './Data/ApiData'
import Cards from './Pages/Cards'
import Home from './Pages/Home'
import Story from './Pages/Story'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ApiData>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cards' element={<Cards />} />
            <Route path='/story/:id' element={<Story/>}/>
          </Routes>
        </ApiData>
      </BrowserRouter>
    </div>
  )
}