import React, { useRef, useState, useEffect } from 'react'
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
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nickname" ref={nickNameRef}/>
                <input type="email" placeholder="Email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button>Registrati</button>
            </form>
            {error &&
                <p>{error}</p>
            }
            <p>Hai un account?<Link to="/auth/login">Accedi</Link></p>
        </div>
    )
}

export default Register
