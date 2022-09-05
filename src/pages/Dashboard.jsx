import React, { useState } from 'react'
import DashboardNav from '../components/Dashboard/DashboardNav'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import { useSelector } from 'react-redux'
import { adminLinks, companyLinks } from '../utils/NavLinks'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const [active, setActive] = useState(
    (user?.role === 'company' && companyLinks[0].id) ||
      (user?.role === 'admin' && adminLinks[0].id)
  )

  return (
    <div className='w-screen h-screen'>
      <DashboardNav />

      <section className='flex w-screen h-[calc(100vh-68px)] overflow-hidden'>
        {/* Side Sidebar */}
        <DashboardSidebar active={active} setActive={setActive} />

        {/* Dashboard Content */}
        {user?.role === 'company' &&
          companyLinks.map(
            (link) => active === link.id && <link.element key={link.id} />
          )}

        {user?.role === 'admin' &&
          adminLinks.map(
            (link) => active === link.id && <link.element key={link.id} />
          )}
      </section>
    </div>
  )
}

export default Dashboard
