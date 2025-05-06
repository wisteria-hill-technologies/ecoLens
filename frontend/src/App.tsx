import { useState } from 'react'
import ImageUpload from './components/ImageUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageUpload />
    </>
  )
}

export default App
