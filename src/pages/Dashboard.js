import React from 'react'
import { Redirect } from 'react-router-dom'
import DashboardActions from '../components/dashboard/DashboardActions'
import DashboardAuctions from '../components/dashboard/DashboardAuctions'

const Dashboard = () => {
    const authToken = window.localStorage.getItem('authToken')

    return (
        <>
        {!authToken ? <Redirect to="/auth/login" /> : (
            <div className="container mx-auto md:p-0 px-5">
                <section className="min-h-full w-full flex md:justify-center justify-start md:items-start items-center pt-5 flex-col md:flex-row mt-5">
                    <div className="w-full md:w-auto flex-1">
                        <h1 className="mb-3 text-center uppercase font-bold text-gray-800 text-sm">Dashboard</h1>
                        <DashboardActions />
                    </div>
                    <div className="w-full md:w-auto flex-1">
                        <h1 className="mb-3 text-center uppercase font-bold text-gray-800 text-sm">Le mie Aste</h1>
                        <DashboardAuctions />
                    </div>
                </section>
            </div>
        )
        }
        </>
    )
}

export default Dashboard
