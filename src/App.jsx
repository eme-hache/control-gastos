import Header from './components/Header'
import { useState } from 'react'

const App = () => {
  const [presupuesto, setPresupuesto] = useState(0)

  return (
    <div>
      <Header presupuesto={presupuesto} setPresupuesto={setPresupuesto} />
    </div>
  )
}

export default App
