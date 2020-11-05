import React from 'react'
import { Redirect } from 'react-router-dom'
import DashboardActions from '../components/dashboard/DashboardActions'
import DashboardAuctions from '../components/dashboard/DashboardAuctions'

const Dashboard = () => {
    const authToken = window.localStorage.getItem('authToken')

    return (
        <>
        {!authToken ? <Redirect to="/auth/login" /> : (
            <div className="container mx-auto">
                <section className="min-h-full w-full flex justify-start items-center flex-col pt-5">
                    <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Dashboard</h1>
                    <DashboardActions />
                    <h1 className="mb-3 text-center uppercase font-bold text-gray-800">Le mie Aste</h1>
                    <DashboardAuctions />
                </section>
            </div>
        )
        }
        </>
    )
}

export default Dashboard
