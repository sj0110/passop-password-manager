import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <div className='select-none'>
      
      {/* Background Styling */}
      <Navbar />
      <Manager />
      <Footer />
      
    </div>
  )
}

export default App
