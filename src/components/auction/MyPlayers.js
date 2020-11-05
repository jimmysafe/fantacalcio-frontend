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
        <div>
            {sections.map(section => (
                <section className="uppercase my-1">
                    <p className="p-2 text-xs font-bold bg-gray-900 text-white text-center">{section.title} ( {section.players.length} )</p>
                    {section.players.map(x => (
                        <div key={x.player._id} className="p-2 flex justify-between items-center text-xs font-bold my-1 mx-1 border border-gray-300">
                            <p>{x.player.name}</p>
                            <p 
                                className="bg-red-500 text-white flex justify-center items-center rounded-md" 
                                style={{ minWidth: 30, height: 30 }}
                            >
                                {x.amount_paid}
                                <span className="lowercase">c</span>
                            </p>
                        </div>
                    ))}
                </section>            
            ))}
        </div>
    )
}

export default MyPlayers
