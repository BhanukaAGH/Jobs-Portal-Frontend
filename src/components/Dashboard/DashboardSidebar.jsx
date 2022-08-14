import React from 'react'
import { MdOutlineDomain, MdOutlineBusinessCenter } from 'react-icons/md'

const DashboardSidebar = ({ active, setActive }) => {
  return (
    <div className='dashboard-sideNav'>
      {/* Side NavLink */}
      <div
        className={`dashboard-link ${active === 1 && '!bg-black !text-white'}`}
        onClick={() => setActive(1)}
      >
        <MdOutlineDomain className='text-lg md:text-2xl' />
        <p className='hidden md:block'>Company</p>
      </div>
      {/* Side NavLink */}
      <div
        className={`dashboard-link ${active === 2 && '!bg-black !text-white'}`}
        onClick={() => setActive(2)}
      >
        <MdOutlineBusinessCenter className='text-lg md:text-2xl' />
        <p className='hidden md:block'>Jobs</p>
      </div>
    </div>
  )
}

export default DashboardSidebar
