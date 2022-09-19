import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu, MdClose } from 'react-icons/md'
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
        className={`flex justify-between w-full px-4 md:px-8 xl:px-12 py-6 items-center fixed top-0 left-0 z-40 transition ${isScrolled && 'bg-[#141414]'
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
                        Dashboard
                      </Link>
                    )}
                    {user?.role === 'company' && (
                      <Link to={'/company/dashboard'} className='avatar-option'>
                        Dashboard
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/user-profile'} className='flex pl-2 avatar-option'>
                        <div className='pr-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        Resume
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/saved'} className='flex pl-2 space-x-2 avatar-option'>
                        <div className='pr-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                          </svg>
                        </div>
                        Saved Postings
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/appliedjobs'} className='flex pl-2 avatar-option'>
                        <div className='pr-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                          </svg>
                        </div>
                        Applied Jobs
                      </Link>
                    )}
                    {user?.role === 'user' && (
                      <Link to={'/appliedjobs'} className='flex pl-2 avatar-option'>
                        <div className='pr-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        Profile
                      </Link>
                    )}
                    <span className='flex pl-2 avatar-option' onClick={onLogout}>
                      <div className='pr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                      </div>
                      Sign out
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
