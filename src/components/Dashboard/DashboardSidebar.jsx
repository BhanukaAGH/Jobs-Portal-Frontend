import React from 'react'
import { MdOutlineDomain, MdOutlineBusinessCenter } from 'react-icons/md'

const DashboardSidebar = () => {
  return (
    <div className='dashboard-sideNav'>
      {/* Side NavLink */}
      <div className='dashboard-link'>
        <MdOutlineDomain className='text-lg md:text-2xl' />
        <p className='hidden md:block'>Company</p>
      </div>
      {/* Side NavLink */}
      <div className='dashboard-link'>
        <MdOutlineBusinessCenter className='text-lg md:text-2xl' />
        <p className='hidden md:block'>Jobs</p>
      </div>
    </div>
  )
}

export default DashboardSidebar
