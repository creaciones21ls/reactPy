import { useLoaderData } from "react-router-dom"
import { getContacts } from "../contacts.js";

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

const Lista = () => {

    const { contacts } = useLoaderData();

    return (
        <div className="table-list">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Servicio</th>
                        <th>Teléfono</th>
                        <th>Fecha de Cita</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.length ?
                            contacts.map((contact) =>
                                <tr key={contact.id}>
                                    <td>{contact.nombre}</td>
                                    <td>{contact.apellido}</td>
                                    <td>{contact.servicio}</td>
                                    <td>{contact.telefono}</td>
                                    <td>{contact.fecha}</td>
                                    <td>{contact.hora}</td>
                                </tr>
                            )
                            : <tr><td>No List</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Lista