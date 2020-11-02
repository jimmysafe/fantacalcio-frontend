import React, { useRef } from 'react'
import { ASSOCIATE_USER_TO_AUCTION } from '../../graphql/mutations/user'
import { useMutation } from '@apollo/client'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


const JoinAuction = ({ close }) => {
    const codeRef = useRef("")
    const [associateUserToAuction, { loading }] = useMutation(ASSOCIATE_USER_TO_AUCTION)
    const { userId } = jwt_decode(localStorage.getItem('authToken'));
    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const auction = await associateUserToAuction({ variables: {
                userId,
                inviteCode: codeRef.current.value
            } })
            history.push(`/users/${auction.data.associateUserToAuction.name}`)
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
            <form 
                className="bg-white rounded-md p-10 flex flex-col justify-center items-center" 
                onSubmit={handleSubmit}
            >
                <p className="mb-5">Codice Invito</p>
 
                <input type="text" ref={codeRef} placeholder="Codice Invito" className="px-5 py-2 shadow-md"/>
     
                <button 
                    disabled={loading}
                    className="mt-5 px-5 py-2 rounded uppercase font-bold bg-teal-500 text-black"
                >
                        {loading ? 'Caricamento..' : 'Entra in Asta'}
                </button>
            </form>
        </div>
    )
}

export default JoinAuction
