import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Navbar from '../components/Home/Navbar'
import BGImage from '../assets/bg.webp'
import Trusted from '../components/Home/Trusted'
import Category from '../components/Home/Category'
import Popular from '../components/Home/Popular'
import Footer from '../components/Home/Footer'
import { useSelector } from 'react-redux'

const Home = () => {
  const { authModal } = useSelector((state) => state.ui)

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='h-screen relative bg-black flex justify-center items-center'>
        <img
          src={BGImage}
          alt='background-img'
          className='absolute top-0 left-0 object-cover w-full h-full opacity-40 select-none'
        />
        <div className='flex flex-col items-center max-w-xl md:max-w-3xl z-10 text-center'>
          <h1 className='text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 select-none'>
            Find a Job in a{' '}
            <span className='text-[#312ECB]'>World Leading</span> Company.
          </h1>
          <p className=' md:text-lg font-medium text-[#CFCFCF] max-w-lg mb-16 select-none'>
            We Help you to find the best job to build your future and build a
            better future of digital era.
          </p>
          <div className='flex items-center py-1 pl-3 pr-1 bg-white rounded-lg md:w-1/2 gap-x-2'>
            <FaSearch className='text-2xl text-[#9CA3AF]' />
            <input
              type='text'
              className='placeholder:italic rounded-lg w-full py-2 px-1 outline-none font-[Poppins] text-sm'
              placeholder='Job title or keyword . . .'
            />
            <button className='px-6 py-2 font-medium rounded-md bg-blue-700 text-white'>
              Search
            </button>
          </div>
        </div>
      </header>
      <Trusted />
      <Category />
      <Popular />
      <Footer />
    </div>
  )
}

export default Home
