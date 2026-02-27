import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Display from './pages/Display'
import RemoteControl from './pages/RemoteControl'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/remote" element={<RemoteControl />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
