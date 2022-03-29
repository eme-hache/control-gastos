import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Header from './components/Header'
import Modal from './components/Modal'
import { generarId } from './helpers'
import { useState } from 'react'

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [modal, setModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 150);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId()
    
    setGastos([...gastos, gasto])
  }

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <div className='nuevo-gasto'>
          <img s
            src={IconoNuevoGasto}
            alt='Icono nuevo gasto'
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {modal && (
        <Modal 
          setModal={setModal} 
          setAnimarModal={setAnimarModal}
          animarModal={animarModal}
          guardarGasto={guardarGasto}
        />
      )}
    </div>
  )
}

export default App
