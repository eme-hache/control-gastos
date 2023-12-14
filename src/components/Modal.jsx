import CerrarBTN from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({ 
    setModal, 
    setAnimarModal, 
    animarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')
    const [nombre, setNombre] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
            setGastoEditar({})
        }, 500);
    }

    const handleSubmit = evt => {
        evt.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            return
        }

        if (!animarModal) return 

        guardarGasto({ nombre, cantidad, categoria, id, fecha }, ocultarModal)
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBTN}
                    alt='Cerrar modal'
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : ''}`}
                onSubmit={handleSubmit}
            >
                <legend>{Object.keys(gastoEditar).length > 0 ? 'Edita tu Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje && (<Mensaje tipo='error'>{mensaje}</Mensaje>)}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={evt => setNombre(evt.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añade la cantidad del gasto: ej. 300'
                        value={cantidad}
                        onChange={evt => setCantidad(Number(evt.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={evt => setCategoria(evt.target.value)}
                    >
                        <option value="">-- Seleccione una --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type='submit'
                    value={Object.keys(gastoEditar).length > 0 ? 'Guardar cambios' : 'Añadir gasto'}
                />
            </form>
        </div>
    )
}

export default Modal