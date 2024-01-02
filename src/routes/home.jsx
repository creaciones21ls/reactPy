import { Link, Outlet, Form, useLoaderData, NavLink } from "react-router-dom"
import { createContact, getContacts } from "../contacts.js";
import Footer from "../components/footer.jsx";
import { useEffect } from "react";

export async function action() {
    const contact = await createContact();
    return { contact };
}



export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

const Home = () => {

    const { contacts, q } = useLoaderData()

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <header className="container">
                <div className="client-list">
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <div className="navbar">
                        <Link to="/" className="navbar-boton" >Home</Link>
                        <Form method="post">
                            <button className="navbar-boton" type="submit">New Client</button>
                        </Form>
                    </div>
                    <nav>
                        <ul>
                            {
                                contacts.length ? contacts.map((contact) => <li key={contact.id}><NavLink to={`form/${contact.id}`} className={({ isActive }) =>
                                    isActive ? "active" : ''
                                }>

                                    {
                                        contact.nombre || contact.apellido ? (<p>{`${contact.nombre} ${contact.apellido}`}</p>) : <p><span>No Name</span></p>
                                    }


                                </NavLink></li>) : <p><span>No Contacts</span></p>
                            }
                        </ul>
                    </nav>
                    <Link to="/lista" className="list-link">Lista</Link>
                </div>
                <section className="formulario-req-form"><Outlet /></section>
            </header>
            <Footer />
        </>
    )

}

export default Home