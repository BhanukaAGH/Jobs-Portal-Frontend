import React, { useState, useEffect } from 'react'
import Navbar from '../components/Home/Navbar'
import JobsCard from '../components/Candidate/JobCards'
import { useSelector } from 'react-redux'
import api from '../utils/api'
import { useLocation, useSearchParams } from 'react-router-dom'
import { categories } from '../utils/jobCategories'

const Jobs = () => {
  const [params] = useSearchParams()
  const urlLocation = useLocation()
  const { authModal } = useSelector((state) => state.ui)
  //company details for dropdown
  const [companies, setCompanies] = useState([])
  //jobs categpries
  const [category, setCategory] = useState([])
  //job medialities
  const [medialitiy, setMedialitiy] = useState([])
  //job experience
  const [experience, setExperience] = useState([])

  //search data
  const [keyword, setKeyword] = useState(params.get('searchKey') || '')
  const [location, setLocation] = useState('')
  const [search, setSearch] = useState(0)
  //filter data
  const [experienceF, setExperienceF] = useState('')
  const [companyF, setCompanyF] = useState('')
  const [categoryF, setCategoryF] = useState(
    categories.find((catg) => catg.paramName === params.get('category'))
      ?.name || ''
  )
  const [medialitiyF, setMedialitiyF] = useState('')

  //! Get All Company
  const getAllCompany = async () => {
    const response = await api.get('/company')
    setCompanies(response.data.companies)
    return response.data
  }
  //geta all jobs
  const getAllJobs = async () => {
    const API_URL = `candidate/getAllJobs?page=${0}`
    const response = await api.post(API_URL)

    setCategory(response.data.distincCat)
    setMedialitiy(response.data.mediality)
    setExperience(response.data.experience)
  }
  const Onsearch = async () => {
    setSearch(1)
    //setSearch(0)
  }
  useEffect(() => {
    getAllCompany()
    getAllJobs()
  }, [])

  useEffect(() => {
    setCategoryF(
      categories.find((catg) => catg.paramName === params.get('category'))
        ?.name || ''
    )
    //test
    setSearch(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLocation])

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>Find Your Dream Job</h1>

        <div className='header-search-container'>
          <div className='flex items-center w-full space-x-2'>
            <input
              type='text'
              className='header-input'
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              defaultValue={keyword}
              placeholder='Job title or keyword'
            />
            <input
              type='text'
              className='header-input'
              onChange={(e) => {
                setLocation(e.target.value)
              }}
              placeholder='Location'
            />
            <button className='header-search-button' onClick={Onsearch}>
              Search
            </button>
          </div>
        </div>
      </header>
      <div className='flex flex-col items-center mt-16'>
        <div className='flex items-center space-x-2'>
          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
            onChange={(e) => {
              setExperienceF(e.target.value)
            }}
          >
            <option value=''>Experience</option>
            {experience.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
            onChange={(e) => {
              setCompanyF(e.target.value)
            }}
          >
            <option value=''>Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
            onChange={(e) => {
              setCategoryF(e.target.value)
            }}
          >
            <option value=''>Category</option>
            {category.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
            onChange={(e) => {
              setMedialitiyF(e.target.value)
            }}
          >
            <option value=''>Mediality</option>
            {medialitiy.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-center  w-1/2 mt-3'>
          <div className='box-border grow-0  h-auto'>
            {/* card starts here */}

            <JobsCard
              keyword={keyword}
              location={location}
              search={search}
              setSearch={setSearch}
              experienceF={experienceF}
              companyF={companyF}
              categoryF={categoryF}
              medialitiyF={medialitiyF}
            />
            {/* card ends here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
