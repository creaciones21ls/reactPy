import { useState } from "react"
import { Form, redirect } from "react-router-dom"
import { updateContact } from "../contacts.js";


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.formID, updates);
    return redirect(`/`);
}

const Formulario = () => {


    const [isCompleteName, setIsCompleteName] = useState(false)
    const [isCompleteLast, setIsCompleteLast] = useState(false)
    const [isCompleteSpace, setIsCompleteSpace] = useState(false)
    const [isCompleteTelf, setIsCompleteTelf] = useState(true)

    const tougleClassName = isCompleteName ? 'valid' : 'invalid'
    const tougleClassLastName = isCompleteLast ? 'valid' : 'invalid'
    const tougleClassSpace = isCompleteSpace ? 'valid' : 'invalid'
    const tougleClassNum = isCompleteTelf ? 'valid' : 'invalid'

    const checkTelf = (e) => {
        let numeros = /[0-9_]/
        if (e.target.value.match(numeros)) {
            setIsCompleteTelf(true)
        }
        else {
            setIsCompleteTelf(false)
        }
    }


    const checkInput = (e) => {
        let letras = /[A-Za-z]/;

        // Condicion#1 mayor a 2 caracteres
        if (e.target.value.length > 1) {
            setIsCompleteName(true)
        }
        else {
            setIsCompleteName(false)
        }

        // Condicion#2 La primera letra es mayuscula
        if (e.target.value.match(letras) && (e.target.value.charAt(0) === e.target.value.charAt(0).toUpperCase())) {
            setIsCompleteLast(true)
        }
        else {
            setIsCompleteLast(false)
        }

        // Condicion#3 La contraseña no tiene espacios
        if (e.target.value.slice(0, 1) != ' ') {
            setIsCompleteSpace(true)
        } else {
            setIsCompleteSpace(false)
        }

    }


    return (
        <>
            <div className="requisitosMin">
                <h2>Requisitos mínimos</h2>
                <ul>
                    <li className={tougleClassName}>2 carácteres</li>
                    <li className={tougleClassLastName}>primera letra mayúscula</li>
                    <li className={tougleClassSpace}>sin espacio</li>
                    <li className={tougleClassNum}>solo números en teléfono</li>
                </ul>
            </div>
            <div className='formulario'>
                <Form method="post">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name='nombre' placeholder='Ingresa nombre' onChange={checkInput} />
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" name='apellido' id="apellido" placeholder='Ingresa apellido' onChange={checkInput} />
                    <label htmlFor="servicio">Servicio</label>
                    <input type="text" name='servicio' id="servicio" placeholder='Ingresa el servicio' onChange={checkInput} />
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" name='telefono' id="telefono" placeholder='Ingresa teléfono' onChange={checkTelf} />
                    <label htmlFor="fecha">Fecha de Cita</label>
                    <input type="date" name="fecha" id="fecha" onChange={checkInput} />
                    <label htmlFor="hora">Hora de Cita</label>
                    <input type="time" name="hora" id="hora" onChange={checkInput} />
                    <button type="submit"> Continuar</button>
                </Form>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (!window.confirm("Please confirm you want to delete this record.")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit">Delete</button>
                </Form>
            </div>
        </>
    )
}

export default Formulario
