import React from 'react'
import DashboardActions from '../components/DashboardActions'

const Dashboard = () => {
    return (
        <div className="container mx-auto">
            <section className="min-h-screen w-screen flex justify-center items-center flex-col">
                <DashboardActions />
            </section>
        </div>
    )
}

export default Dashboard
