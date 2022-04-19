import logo from './logo.svg'
import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import NavHeader from './components/home/NavHeader'
import Search from './components/search/Search'
import { Container } from 'react-bootstrap'

const App = () => {
  const [state, setState] = useState('')
  return (
    <>
      <Container>
        <NavHeader />
      </Container>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
