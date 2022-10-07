import React, { useEffect, useState } from 'react'
import Navbar from '../components/Home/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompany, reset } from '../features/company/companySlice'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import {
  MdGridView,
  MdOutlineLocationOn,
  MdOutlineViewHeadline,
  MdPeopleOutline,
  MdPublic,
} from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'

const companyListVariant = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const Companies = () => {
  const [data, setData] = useState([])
  const [gridView, setGridView] = useState(true)
  const dispatch = useDispatch()
  const { authModal } = useSelector((state) => state.ui)
  const { companies, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.company
  )

  const { register, handleSubmit } = useForm()

  const onSearch = ({ search }) => {
    if (search) {
      setData(
        companies.filter((company) =>
          company.name.toLowerCase().includes(search.toLowerCase())
        )
      )
      return
    }
    setData(companies)
  }

  useEffect(() => {
    dispatch(getAllCompany())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSuccess) setData(companies)

    if (isError) toast(message, { theme: 'light', type: 'error' })
    dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, message])

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>Find great places to work</h1>

        <div className='header-search-container'>
          <form
            className='flex items-center w-full space-x-2'
            onSubmit={handleSubmit(onSearch)}
          >
            <input
              type='text'
              {...register('search')}
              className='header-input'
              placeholder='Company name or keyword'
            />

            <button type='submit' className='header-search-button'>
              Search
            </button>
          </form>
        </div>
      </header>

      <div className='md:max-w-5xl xl:max-w-7xl mx-auto mt-16 pb-6'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <div className='hidden md:flex items-center justify-between px-4 mb-2'>
                  <p className='text-sm italic'>{`${data.length} results found`}</p>
                  <div className='flex items-center space-x-2 text-3xl'>
                    <MdOutlineViewHeadline
                      className='bg-gray-100 rounded p-1 cursor-pointer'
                      onClick={() => setGridView(false)}
                    />
                    <MdGridView
                      className='bg-gray-100 rounded p-1 cursor-pointer'
                      onClick={() => setGridView(true)}
                    />
                  </div>
                </div>
                <motion.div
                  layout
                  variants={companyListVariant}
                  className={`grid grid-cols-1 ${
                    gridView && 'md:grid-cols-2'
                  } gap-8 p-3`}
                >
                  <AnimatePresence>
                    {data?.map((company) => (
                      <CompanyCard key={company._id} company={company} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <p className='text-xl text-center font-[Poppins] font-semibold'>
                Not Found Companies
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const CompanyCard = ({ company }) => {
  return (
    <motion.div
      layout
      initial='hidden'
      animate='visible'
      exit='exit'
      className='col-span-1 rounded-xl p-6 select-none relative bg-white ring-1 ring-black/10 shadow-lg'
    >
      <div className='flex flex-col font-[Poppins] font-medium'>
        <div className='flex divide-x divide-gray-600'>
          <div className='p-2 h-24 w-24 flex items-center justify-center'>
            <img
              src={company?.photoUrl}
              alt='company-logo'
              className='h-full object-cover'
            />
          </div>
          <div className='font-[Poppins] pl-2'>
            <h1 className='text-3xl font-bold'>{company.name}</h1>
            <p className='text-sm flex items-center gap-x-1'>
              <MdOutlineLocationOn />
              {company?._company?.companyLocation}
            </p>
            <a
              href={company?._company?.companyWebsite}
              className='text-sm flex items-center gap-x-1 hover:text-blue-500'
            >
              <MdPublic />
              {company?._company?.companyWebsite}
            </a>
            <p className='text-sm flex items-center gap-x-1'>
              <MdPeopleOutline />
              {company?._company?.numberOfEmployees}
            </p>
          </div>
        </div>

        <p className='pt-3'>{company?._company?.companyDescription}</p>
      </div>
      {company?._company?.verified && (
        <span className='absolute bottom-0 right-0 px-6 py-1 bg-[#14163A] rounded-tl-xl rounded-br-xl text-white font-[Poppins] text-sm'>
          Verified
        </span>
      )}
    </motion.div>
  )
}

export default Companies
