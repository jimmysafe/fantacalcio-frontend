import React from 'react'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const location = useLocation()

    return (
        <main className={`h-screen flex flex-col md:pb-3 p-0 ${location.pathname.includes('auction') ? 'overflow-hidden' : ''}`}>
            {children}
        </main>
    )
}

export default Layout
