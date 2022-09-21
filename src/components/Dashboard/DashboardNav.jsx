import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import Logo from '../../assets/Logo.webp'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { MdOutlineLogout } from 'react-icons/md'

const DashboardNav = () => {
  const ref = useRef()
  const [openDropDown, setOpenDropDown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useOnClickOutside(ref, () => setOpenDropDown(false))

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
            src={user?.profileImg}
            alt='user-profile'
          />
        </button>

        {openDropDown && (
          <div ref={ref}>
            <div
              className='absolute right-0 z-30 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              role='menu'
            >
              <span className='avatar-option' onClick={onLogout}>
                <MdOutlineLogout className='text-xl' />
                <span>Sign out</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default DashboardNav
