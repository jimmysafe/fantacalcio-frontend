import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOGIN_USER } from '../../graphql/mutations/user'
import { useMutation } from '@apollo/client'


const Login = () => {
    const location = useLocation()
    const [error, setError] = useState("")
    const [loginUser] = useMutation(LOGIN_USER)

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const loginRedirectUrl = location.state ? location.state.prevUrl : '/'

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginData = await loginUser({ variables: {
                email: emailRef.current.value,
                password: passwordRef.current.value
            } })

            window.localStorage.setItem('authToken', loginData.data.loginUser.token)

            window.location.replace(loginRedirectUrl)

        } catch(err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white shadow-md p-5 rounded-md" style={{ minWidth: 400 }}>
                <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Accedi</h1>
                <input type="email" placeholder="Email" ref={emailRef} className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                <input type="password" placeholder="Password" ref={passwordRef} className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                <button className="bg-teal-400 text-white p-3 uppercase font-bold text-xs rounded-md mt-3">Accedi</button>
            </form>
            {error &&
                <p className="my-3">{error}</p>
            }
            <p className="my-3">Non hai ancora un account?<Link to="/auth/register"> Registrati</Link></p>
        </div>
    )
}

export default Login
