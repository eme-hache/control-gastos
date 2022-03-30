import ListadoGastos from './components/LIstadoGastos'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Header from './components/Header'
import Modal from './components/Modal'
import { generarId } from './helpers'
import { useState, useEffect } from 'react'

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [modal, setModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto()
    }
  }, [gastoEditar])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 150);
  }

  const guardarGasto = (gasto, callback) => {
    gasto.id = generarId()
    gasto.fecha = Date.now()
    
    setGastos([...gastos, gasto])

    callback()
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
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
