import React, { useState } from 'react'
import DashboardNav from '../components/Dashboard/DashboardNav'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import CompanyDashboard from '../components/Company/CompanyDashboard'
import JobDashboard from '../components/Company/JobDashboard'

const Dashboard = () => {
  const [active, setActive] = useState(1)
  return (
    <div className='w-screen h-screen'>
      <DashboardNav />

      <section className='flex w-screen h-[calc(100vh-68px)] overflow-hidden'>
        {/* Side Sidebar */}
        <DashboardSidebar active={active} setActive={setActive} />

        {/* Dashboard Content */}
        {active === 1 && <CompanyDashboard />}
        {active === 2 && <JobDashboard />}
      </section>
    </div>
  )
}

export default Dashboard
