import React from 'react'
import DashboardNav from '../components/Dashboard/DashboardNav'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import CompanyDashboard from '../components/Company/CompanyDashboard'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen'>
      <DashboardNav />

      <section className='flex w-full h-[calc(100vh-68px)]'>
        {/* Side Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Content */}
        <CompanyDashboard />
      </section>
    </div>
  )
}

export default Dashboard
