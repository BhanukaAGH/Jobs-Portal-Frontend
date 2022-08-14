import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'

const DashboardNav = () => {
  return (
    <nav className='dashboard-nav'>
      <Link to={'/'} className='flex items-center gap-x-1'>
        <img src={Logo} alt='website-logo' className='w-12' />
        <p className='text-xl font-bold text-black font-[Domine]'>Jobs.lk</p>
      </Link>
      <img
        className='dashboard-avatar'
        src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'
        alt='user-profile'
      />
    </nav>
  )
}

export default DashboardNav
