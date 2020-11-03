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
                className="flex flex-col bg-white shadow-md p-5 rounded-md relative" 
                style={{ minWidth: 400 }}
                onSubmit={handleSubmit}
            >
                <div className="absolute text-gray-900 font-bold text-lg cursor-pointer" style={{ top: 7, right: 20 }} onClick={() => close()}>x</div>
                <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Codice Invito</h1>
 
                <input type="text" ref={codeRef} placeholder="Codice Invito" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
     
                <button 
                    disabled={loading}
                    className="bg-teal-400 text-white p-3 uppercase font-bold text-xs rounded-md mt-3"
                >
                        {loading ? 'Caricamento..' : 'Entra in Asta'}
                </button>
            </form>
        </div>
    )
}

export default JoinAuction
