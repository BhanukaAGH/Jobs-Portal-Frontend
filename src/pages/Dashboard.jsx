import React from 'react'
import { MdOutlineDomain, MdOutlineBusinessCenter } from 'react-icons/md'
import Logo from '../assets/Logo.png'
import CompanyDashboard from '../components/Company/CompanyDashboard'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen'>
      <nav className='dashboard-nav'>
        <div className='flex items-center gap-x-1 cursor-pointer'>
          <img src={Logo} alt='website-logo' className='w-12' />
          <p className='text-xl font-bold text-black font-[Domine]'>Jobs.lk</p>
        </div>
        <img
          className='dashboard-avatar'
          src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'
          alt='user-profile'
        />
      </nav>

      <section className='flex w-full h-[calc(100vh-68px)]'>
        {/* Side NavBar */}
        <div className='dashboard-sideNav'>
          <div className='dashboard-link'>
            <MdOutlineDomain className='text-lg md:text-2xl' />
            <p className='hidden md:block'>Company</p>
          </div>
          <div className='dashboard-link'>
            <MdOutlineBusinessCenter className='text-lg md:text-2xl' />
            <p className='hidden md:block'>Jobs</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <CompanyDashboard />
      </section>
    </div>
  )
}

export default Dashboard
