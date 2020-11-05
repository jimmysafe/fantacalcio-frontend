import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { CREATE_AUCTION } from '../../graphql/mutations/auction'


const CreateAuction = ({ close }) => {
    const nickNameRef = useRef("")
    const goalkeepersRef = useRef(1)
    const defendersRef = useRef(1)
    const midfieldersRef = useRef(1)
    const strikersRef = useRef(1)

    const [auctionCreate, { loading }] = useMutation(CREATE_AUCTION);
    const { userId } = jwt_decode(localStorage.getItem('authToken'));
    const history = useHistory()


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const createdAuction = await auctionCreate({ variables: { 
                userId,
                nickName: nickNameRef.current.value,
                rules: {
                    goalkeepers: Number(goalkeepersRef.current.value),
                    defenders: Number(defendersRef.current.value),
                    midfielders: Number(midfieldersRef.current.value),
                    strikers: Number(strikersRef.current.value)
                }
            } })
            close()
            history.push(`/users/${createdAuction.data.createAuction.name}`)
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
                <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Dai un nome a questa asta.</h1>
                <input type="text" ref={nickNameRef} placeholder="Nome asta" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>

                <div className="mt-3">
                    <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Quanti giocatori si possono avere in rosa?</h1>
                    <div>
                        <p className="uppercase font-bold text-gray-800 text-xs mb-1">Numero Portieri:</p>
                        <input required type="number" ref={goalkeepersRef} placeholder="0" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                    </div>
                    <div>
                        <p className="uppercase font-bold text-gray-800 text-xs mb-1">Numero Difensori:</p>
                        <input required type="number" ref={defendersRef} placeholder="0" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                    </div>
                    <div>
                        <p className="uppercase font-bold text-gray-800 text-xs mb-1">Numero Centrocampisti:</p>
                        <input required type="number" ref={midfieldersRef} placeholder="0" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                    </div>
                    <div>
                        <p className="uppercase font-bold text-gray-800 text-xs mb-1">Numero Attaccanti:</p>
                        <input required type="number" ref={strikersRef} placeholder="0" className="p-3 w-full mb-3 border border-gray-400 rounded-md"/>
                    </div>
                </div>
     
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

export default CreateAuction
