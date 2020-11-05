import React, { useState } from 'react'
import JoinAuction from '../modals/JoinAuction'
import CreateAuction from '../modals/CreateAuction';

const DashboardActions = () => {

    const [showJoinModal, setShowJoinModal] = useState(false)
    const [showCreateAuctionModal, setShowCreateAuctionModal] = useState(false)

    return (
        <>
        {showJoinModal && <JoinAuction close={() => setShowJoinModal(false)}/>}
        {showCreateAuctionModal && <CreateAuction close={() => setShowCreateAuctionModal(false)} /> }
        <div className="flex flex-col py-5">
             <button 
                onClick={() => setShowCreateAuctionModal(true)}
                className="px-5 py-3 rounded uppercase font-bold bg-red-500 text-white mb-5"
            >
                Crea Asta
            </button>
            <button 
                onClick={() => setShowJoinModal(true)}
                className="px-5 py-3 rounded uppercase font-bold bg-teal-500 text-white mb-5"
            >
                Entra in Asta con codice invito
            </button>
        </div>
        </>
    )
}

export default DashboardActions
