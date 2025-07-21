import { useState } from 'react'
import './App.css'
import SchemaBuilder from './components/SchemaBuilder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SchemaBuilder />
      </div>
    </>
  )
}

export default App


