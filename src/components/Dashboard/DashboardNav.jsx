import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import Logo from '../../assets/Logo.png'

const DashboardNav = () => {
  const [openDropDown, setOpenDropDown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className='dashboard-nav'>
      <Link to={'/'} className='flex items-center gap-x-1'>
        <img src={Logo} alt='website-logo' className='w-12' />
        <p className='text-xl font-bold text-black font-[Domine]'>Jobs.lk</p>
      </Link>

      <div className='relative'>
        <button type='button' onClick={() => setOpenDropDown(!openDropDown)}>
          <img
            className='dashboard-avatar'
            src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'
            alt='user-profile'
          />
        </button>

        {openDropDown && (
          <OutsideClickHandler onOutsideClick={() => setOpenDropDown(false)}>
            <div
              className='absolute right-0 z-30 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              role='menu'
            >
              <span className='avatar-option' onClick={onLogout}>
                Sign out
              </span>
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </nav>
  )
}

export default DashboardNav
