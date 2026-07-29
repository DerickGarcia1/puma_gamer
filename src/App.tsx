import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PumaRun from './pages/PumaRun'
import PumaFour from './pages/PumaFour'
import BatallaNaval from './pages/BatallaNaval'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/puma-run" element={<PumaRun />} />
      <Route path="/puma-four" element={<PumaFour />} />
      <Route path="/batalla-naval" element={<BatallaNaval />} />
    </Routes>
  )
}

export default App