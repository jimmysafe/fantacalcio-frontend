import React from 'react'
import DashboardActions from '../components/dashboard/DashboardActions'
import DashboardAuctions from '../components/dashboard/DashboardAuctions'
const Dashboard = () => {

    return (
        <div className="container mx-auto">
            <section className="min-h-screen w-full flex justify-start items-center flex-col">
                <DashboardActions />
                <DashboardAuctions />
            </section>
        </div>
    )
}

export default Dashboard
