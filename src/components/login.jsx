import { useState } from "react"

const Login = ({ validateUser }) => {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user === '' || pass === '') {
            setError(true)
            return
        } else if (user == 'limon' && pass == '0120') {
            validateUser({ isPermitted: true })
        } else {
            setError(false)
        }


    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1><center>Login</center></h1>
            <input type="text" placeholder="usuario" name="usuario" value={user} onChange={(e) => { setUser(e.target.value) }} />
            <input type="password" placeholder="password" name="contrasena" value={pass} onChange={(e) => { setPass(e.target.value) }} />
            <button type="submit">ENTRAR</button>
            {
                error ? <p>Todos los campos son oligatorios</p> : ''
            }
        </form>


    )

}

export default Login