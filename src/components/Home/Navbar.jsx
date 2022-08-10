import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu, MdClose } from 'react-icons/md'
import Logo from '../../assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavbar } from '../../features/ui/uiSlice'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const dispatch = useDispatch()
  const { toggleNav } = useSelector((state) => state.ui)

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
        <div className='flex items-center gap-x-2 md:mr-12 lg:mr-16 cursor-pointer'>
          <img src={Logo} alt='website-logo' />
          <p className='text-2xl font-medium text-white font-[Domine]'>
            Jobs.lk
          </p>
        </div>
        {/* List */}
        <div className='hidden md:flex items-center md:gap-x-4 lg:gap-x-6 text-white font-medium font-[Poppins] flex-1 '>
          <Link to={'jobs'} className='hover:scale-110 hover:font-bold'>
            Jobs
          </Link>
          <Link to={'companies'} className='hover:scale-110 hover:font-bold'>
            Companies
          </Link>
          <Link to={'events'} className='hover:scale-110 hover:font-bold'>
            Events
          </Link>
          <Link to={'about'} className='hover:scale-110 hover:font-bold'>
            About us
          </Link>
        </div>
        {/* right sign In */}
        <div className='hidden md:flex items-center gap-x-3 text-white font-[Poppins] '>
          <button className='px-4 py-1 rounded-md hover:scale-110 hover:font-extrabold'>
            Sign in
          </button>
          <button className='px-4 py-1 md:px-6 md:py-2 font-medium bg-[#312ECB] rounded-md hover:bg-blue-700'>
            Post Job
          </button>
        </div>

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
      {/* Modile Nav */}
      {toggleNav && (
        <div className='h-screen md:hidden fixed top-0 left-0 w-full bg-black z-30 pt-24 pb-8 px-6'>
          <div className='flex flex-col w-full h-5/6 text-white gap-6 text-2xl font-medium font-[Poppins]'>
            <Link to={'jobs'} className='hover:text-[#312ECB]'>
              Jobs
            </Link>
            <Link to={'companies'} className='hover:text-[#312ECB]'>
              Companies
            </Link>
            <Link to={'events'} className='hover:text-[#312ECB]'>
              Events
            </Link>
            <Link to={'about'} className='hover:text-[#312ECB]'>
              About us
            </Link>
          </div>
          <div className='flex flex-col text-white gap-4 font-[Poppins] h-1/6'>
            <button className='px-3 py-2 border border-white rounded-md hover:bg-gray-800'>
              Sign in
            </button>
            <button className='px-4 py-2 font-medium bg-[#312ECB] rounded-md hover:bg-blue-700'>
              Post Job
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
