import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../utils/api'
import Navbar from '../components/Home/Navbar'
import AppliedJobsCards from '../components/Candidate/AppliedJobsCards'

const AppliedJobs = () => {
  const { user } = useSelector((state) => state.auth)
  const { authModal } = useSelector((state) => state.ui)

  //store applied jobs
  const [data, setData] = useState([])
  //search data
  const [keyword, setKeyword] = useState('')

  const getAppliedJobs = async () => {
    const API_URL = `candidate/userappliedJobs/${user.userId}`
    const response = await api.get(API_URL)
    setData(
      response.data.find.filter(
        (data) =>
          data.CompanyID.name.toLowerCase().includes(keyword.toLowerCase()) ||
          data.JobID.jobTitle.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }

  useEffect(() => {
    getAppliedJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className={`${authModal && 'h-screen overflow-hidden'}`}>
        <Navbar />
        <header className='header-container'>
          <h1 className='header-title flex '>Applied Job's</h1>
          <div className='header-search-container'>
            <div className='flex items-center w-full space-x-2'>
              <input
                type='text'
                className='header-input'
                placeholder='Search Job title'
                onChange={(e) => {
                  setKeyword(e.target.value)
                }}
              />
              <button className='header-search-button' onClick={getAppliedJobs}>
                Search
              </button>
            </div>
          </div>
        </header>
        <div className='box-border h-auto w-full pt-16 pr-36 pl-36 '>
          <AppliedJobsCards data={data} />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  )
}

export default AppliedJobs
