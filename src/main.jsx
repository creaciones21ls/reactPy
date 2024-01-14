import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Formulario, { action as formAction } from './routes/formulario'
import Lista, { loader as rootLoader } from './routes/lista'
import Home, { action as rootAction, loader as rootLoaderHome } from './routes/home'
import { action as destroyAction } from './routes/destroy'
import Index from './routes/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    action: rootAction,
    loader: rootLoaderHome,
    children: [
      { index: true, element: <Index />, },
      { path: "form/:formID", element: <Formulario />, action: formAction, },
      { path: "form/:formID/destroy", action: destroyAction, },
      { path: "lista", element: <Lista />, loader: rootLoader, }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
