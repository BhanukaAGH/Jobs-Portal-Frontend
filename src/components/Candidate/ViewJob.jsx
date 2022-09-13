import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import { applyJob } from '../../features/ui/uiSlice'
import Navbar from '../Home/Navbar'
import BGImage from '../../assets/bg.webp'

const ViewJob = ({ setViewjob }) => {
  const { user } = useSelector((state) => state.auth)
  const { jobApply } = useSelector((state) => state.ui)
  const { authModal } = useSelector((state) => state.ui)

  const navigate = useNavigate()
  const getResume = async () => {
    const API_URL = `candidate/viewResume/${user.userId}`
    const response = await api.get(API_URL);
    console.log("response", response)
  }
  useEffect(() => {
    getResume();
    console.log("a", jobApply)
  }, [])

  return (
    // <><button onClick={() => navigate('/jobs')}>go back</button></>
    <>
      <div className={`${authModal && 'h-screen overflow-hidden'}`}>
        <Navbar />
        <header className='relative h-72 bg-[#14163A] flex  items-center'>

          <img
            src={BGImage}
            alt='job-img'
            className='object-cover h-24 w-24 rounded-lg shadow-2xl'
          />
          <h1 className='header-title'>Job Name</h1>
          <h1 className='header-title'>Company Name</h1>
          
        </header>
      </div>
    </>

  )
}

export default ViewJob
