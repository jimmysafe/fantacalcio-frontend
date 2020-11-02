import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LOGIN_USER } from '../../graphql/mutations/user'
import { useMutation } from '@apollo/client'



const Login = () => {
    const history = useHistory()
    const [error, setError] = useState("")
    const [loginUser] = useMutation(LOGIN_USER)

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginData = await loginUser({ variables: {
                email: emailRef.current.value,
                password: passwordRef.current.value
            } })

            window.localStorage.setItem('authToken', loginData.data.loginUser.token)
            history.push('/')

        } catch(err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button>Accedi</button>
            </form>
            {error &&
                <p>{error}</p>
            }
            <p>Non hai ancora un account?<Link to="/auth/register">Registrati</Link></p>
        </div>
    )
}

export default Login
