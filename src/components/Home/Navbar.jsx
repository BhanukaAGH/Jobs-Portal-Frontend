import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MdMenu,
  MdClose,
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlineBookmarks,
  MdOutlineAccountCircle,
  MdOutlineDescription,
  MdOutlineBusinessCenter,
} from 'react-icons/md'
import Logo from '../../assets/Logo.webp'
import { useDispatch, useSelector } from 'react-redux'
import { openAuth, toggleNavbar } from '../../features/ui/uiSlice'
import { logout, reset } from '../../features/auth/authSlice'
import AuthModal from '../Auth/AuthModal'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Navbar = () => {
  const ref = useRef()
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropDown, setOpenDropDown] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toggleNav, authModal } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    setOpenDropDown(false)
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useOnClickOutside(ref, () => setOpenDropDown(false))

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`flex justify-between w-full px-4 md:px-8 xl:px-12 py-6 items-center fixed top-0 left-0 z-40 transition ${
          isScrolled && 'bg-[#141414]'
        }`}
      >
        {/* Logo */}
        <Link
          to={'/'}
          className='flex items-center gap-x-2 md:mr-12 lg:mr-16 cursor-pointer'
        >
          <img src={Logo} alt='website-logo' />
          <p className='text-2xl font-medium text-white font-[Domine]'>
            Jobs.lk
          </p>
        </Link>
        {/* List */}
        <div className='hidden md:flex items-center md:gap-x-4 lg:gap-x-6 text-white font-medium font-[Poppins] flex-1 '>
          <Link to={'/jobs'} className='hover:scale-110 hover:font-bold'>
            Jobs
          </Link>
          <Link to={'/companies'} className='hover:scale-110 hover:font-bold'>
            Companies
          </Link>
          <Link to={'/events'} className='hover:scale-110 hover:font-bold'>
            Events
          </Link>
          <Link to={'/about'} className='hover:scale-110 hover:font-bold'>
            About us
          </Link>
        </div>
        {/* right sign In */}
        {!user && (
          <div className='hidden md:flex items-center gap-x-3 text-white font-[Poppins] '>
            <button
              className='px-4 py-1 rounded-md hover:scale-110 hover:font-extrabold'
              onClick={() => dispatch(openAuth(true))}
            >
              Sign in
            </button>
            <Link
              to={'/company/post-job'}
              className='px-4 py-1 md:px-6 md:py-2 text-center font-medium bg-[#312ECB] rounded-md hover:bg-blue-700'
            >
              Post Job
            </Link>
          </div>
        )}
        <div className='flex items-center justify-center space-x-3'>
          {user && (
            <div className='relative'>
              <button
                type='button'
                className='flex items-center justify-center'
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <span className='hidden text-white text-sm font-[Mulish] md:block pr-2'>
                  {user?.name}
                </span>
                <img
                  className='dashboard-avatar'
                  src={user?.profileImg}
                  alt='user-profile'
                />
              </button>

              {openDropDown && (
                <div ref={ref}>
                  <div
                    className='absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                  >
                    {user?.role === 'admin' && (
                      <Link to={'/admin/dashboard'} className='avatar-option'>
                        <MdOutlineDashboard className='text-xl' />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    {user?.role === 'company' && (
                      <Link to={'/company/dashboard'} className='avatar-option'>
                        <MdOutlineDashboard className='text-xl' />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/user-profile'} className='avatar-option '>
                        <MdOutlineDescription className='text-xl' />
                        <span>Resume</span>
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/saved'} className='avatar-option'>
                        <MdOutlineBookmarks className='text-xl' />
                        <span>Saved Postings</span>
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/appliedjobs'} className='avatar-option'>
                        <MdOutlineBusinessCenter className='text-xl' />
                        <span>Applied Jobs</span>
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/appliedjobs'} className='avatar-option'>
                        <MdOutlineAccountCircle className='text-xl' />
                        <span>Profile</span>
                      </Link>
                    )}
                    <span className='avatar-option' onClick={onLogout}>
                      <MdOutlineLogout className='text-xl' />
                      <span>Sign out</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Toggle Button */}
          {toggleNav ? (
            <MdClose
              className='md:hidden flex items-center justify-center text-white bg-slate-600 rounded-full text-[39px] hover:bg-black/50 p-2 cursor-pointer ring-1 ring-white'
              onClick={() => dispatch(toggleNavbar())}
            />
          ) : (
            <MdMenu
              className='md:hidden flex items-center justify-center text-white bg-slate-600 rounded-full text-[39px] hover:bg-black/50 p-2 cursor-pointer'
              onClick={() => dispatch(toggleNavbar())}
            />
          )}
        </div>
      </div>
      {/* Modile Nav */}
      {toggleNav && (
        <div className='h-screen md:hidden fixed top-0 left-0 w-full bg-black z-30 pt-24 pb-8 px-6'>
          <div className='flex flex-col w-full h-5/6 text-white gap-6 text-2xl font-medium font-[Poppins]'>
            <Link
              to={'/jobs'}
              className='hover:text-[#312ECB]'
              onClick={() => dispatch(toggleNavbar())}
            >
              Jobs
            </Link>
            <Link
              to={'/companies'}
              className='hover:text-[#312ECB]'
              onClick={() => dispatch(toggleNavbar())}
            >
              Companies
            </Link>
            <Link
              to={'/events'}
              className='hover:text-[#312ECB]'
              onClick={() => dispatch(toggleNavbar())}
            >
              Events
            </Link>
            <Link
              to={'/about'}
              className='hover:text-[#312ECB]'
              onClick={() => dispatch(toggleNavbar())}
            >
              About us
            </Link>
          </div>
          {!user && (
            <div className='flex flex-col text-white gap-4 font-[Poppins] h-1/6'>
              <button
                className='px-3 py-2 border border-white rounded-md hover:bg-gray-800'
                onClick={() => {
                  dispatch(toggleNavbar())
                  dispatch(openAuth(true))
                }}
              >
                Sign in
              </button>
              <Link
                to={'/company/post-job'}
                className='px-4 py-2 text-center font-medium bg-[#312ECB] rounded-md hover:bg-blue-700'
                onClick={() => dispatch(toggleNavbar())}
              >
                Post Job
              </Link>
            </div>
          )}
        </div>
      )}
      {authModal && <AuthModal />}
    </>
  )
}

export default Navbar
