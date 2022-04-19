import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import Test from './components/Test'

const App = () => {
  const [state, setState] = useState('')
  return (
    <>
      <Test />
    </>
  )
}

export default App