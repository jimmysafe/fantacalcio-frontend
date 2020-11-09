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
        <div className="flex flex-col py-5 text-xs">
             <button 
                onClick={() => setShowCreateAuctionModal(true)}
                className="px-5 py-3 rounded uppercase font-bold bg-gold text-white mb-5 md:h-64 h-20"
            >
                Crea Asta
            </button>
            <button 
                onClick={() => setShowJoinModal(true)}
                className="px-5 py-3 rounded uppercase font-bold bg-lightBlue text-white mb-5 md:h-64 h-20"
            >
                Entra in Asta con codice invito
            </button>
        </div>
        </>
    )
}

export default DashboardActions
