import React, { useState } from 'react'
import JoinAuction from '../modals/JoinAuction'
import { useMutation } from '@apollo/client'
import jwt_decode from "jwt-decode";
import { CREATE_AUCTION } from '../../graphql/mutations/auction'
import { useHistory } from 'react-router-dom';
// import { GET_USER } from '../../graphql/queries/user'


const DashboardActions = () => {

    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [auctionCreate, { loading }] = useMutation(CREATE_AUCTION);

    const createAuction = async() => {
        try {
            const { userId } = jwt_decode(localStorage.getItem('authToken'));
            const createdAuction = await auctionCreate({ 
                variables: { userId },
                // refetchQueries: [{ query: GET_USER, variables: { userId } }]
            })

            console.log(createdAuction)

            history.push(`/users/${createdAuction.data.createAuction.name}`)

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
        {showModal &&
            <JoinAuction close={() => setShowModal(false)}/>
        }
        <div className="flex flex-col py-5">
             <button 
                disabled={loading}
                onClick={() => createAuction()}
                className="px-5 py-3 rounded uppercase font-bold bg-red-500 text-white mb-5"
            >
                {loading ? 'Creando..' : 'Crea Asta'}
            </button>
            <button 
                onClick={() => setShowModal(true)}
                className="px-5 py-3 rounded uppercase font-bold bg-teal-500 text-white mb-5"
            >
                Entra in Asta con codice invito
            </button>
        </div>
        </>
    )
}

export default DashboardActions
