import React from 'react'

const MyPlayers = ({ players }) => {
    const goalkeepers = players.filter(x => x.player.role === 'P')
    const defenders = players.filter(x => x.player.role === 'D')
    const midfielders = players.filter(x => x.player.role === 'C')
    const strikers = players.filter(x => x.player.role === 'A')

    const sections = [
        { title: 'Portieri', players: goalkeepers },
        { title: 'Difensori', players: defenders },
        { title: 'Centrocampisti', players: midfielders },
        { title: 'Attaccanti', players: strikers },
    ]
    
    return (
        <div className="p-5">
            {sections.map(section => (
                <section className="uppercase my-1" key={section.title}>
                    <p className="py-3 text-xs font-bold bg-darkBlue rounded text-white text-center">{section.title} ( {section.players.length} )</p>
                    <div className="p-3">
                        {section.players.map(x => (
                            <div key={x.player._id} className="bg-white shadow-lg rounded p-3 flex justify-between items-center text-xs font-bold my-2 mx-1">
                                <p>{x.player.name}</p>
                                <p 
                                    className="bg-gold rounded-sm text-darkBlue flex justify-center items-center" 
                                    style={{ minWidth: 45, height: 30 }}
                                >
                                    {x.amount_paid}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>            
            ))}
        </div>
    )
}

export default MyPlayers
