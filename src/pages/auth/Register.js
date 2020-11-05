import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { REGISTER_USER, LOGIN_USER } from '../../graphql/mutations/user'
import { useMutation } from '@apollo/client'

const Register = () => {
    const history = useHistory()
    const [error, setError] = useState("")
    const [registerUser] = useMutation(REGISTER_USER)
    const [loginUser] = useMutation(LOGIN_USER)
    const nickNameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const registerData = await registerUser({ variables: {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                nickName: nickNameRef.current.value
            } })
            if(registerData.data.createUser){
                const loginData = await loginUser({ variables: {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                } })

                window.localStorage.setItem('authToken', loginData.data.loginUser.token)

                history.push('/')
            }

        } catch(err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white shadow-md p-5 rounded-md" style={{ minWidth: 400 }}>
                <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Registrati</h1>
                <input type="text" placeholder="Nickname" ref={nickNameRef} className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                <input type="email" placeholder="Email" ref={emailRef} className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                <input type="password" placeholder="Password" ref={passwordRef} className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                <button className="bg-teal-400 text-white p-3 uppercase font-bold text-xs rounded-md mt-3">Registrati</button>
            </form>
            {error &&
               <p className="my-3">{error}</p>
            }
            <p className="my-3">Hai un account?<Link to="/auth/login"> Accedi</Link></p>
        </div>
    )
}

export default Register
