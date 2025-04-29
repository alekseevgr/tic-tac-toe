import { useState } from 'react'

import './App.css'
import Square from '../components/Square'
import BoardGame from '../components/BoardGame'
import Oval from '../components/Oval'
import Cross from '../components/Cross'

function App() {

  return (
    <>
        <Square autoplay={true}/>
        <Oval autoplay={true}/>
        <BoardGame autoplay={true}/>
        <Cross autoplay={true}/>
    </>
  )
}

export default App
