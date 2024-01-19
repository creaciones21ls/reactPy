import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Formulario, { action as formAction } from './routes/formulario'
import Lista, { loader as rootLoader } from './routes/lista'
import Home, { action as rootAction, loader as rootLoaderHome } from './routes/home'
import { action as destroyAction } from './routes/destroy'
import Index from './routes/index';
import Login from './components/login'
import { useState, useEffect } from 'react'

const App = () => {

    const [logUser, setLogUser] = useState('')

    const validateUser = ({ isPermitted }) => {
        setLogUser(isPermitted)
    }

    const router = createBrowserRouter([
        {
            path: "/", element: logUser ? <Home /> : <Login validateUser={validateUser} />, action: rootAction, loader: rootLoaderHome, children: [
                { index: true, element: <Index />, },
                { path: "form/:formID", element: <Formulario />, action: formAction, },
                { path: "form/:formID/destroy", action: destroyAction, },
                { path: "lista", element: <Lista />, loader: rootLoader, },
            ],
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App