import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Home/Navbar'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import axios from 'axios'
import Loading from '../Loading'

//update view delete user profile
const ViewProfile = () => {
  const { authModal } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const inputFile = useRef(null)

  //for loading animation
  const [isLoading, setisLoading] = useState(false)
  //form data
  const [Location, setLocation] = useState('')
  const [PrimaryRole, setPrimaryRole] = useState('')
  const [Statement, setStatement] = useState('')
  const [skillData, setskillData] = useState([])
  const [resumeData, setresumeData] = useState('')
  const [resumeURL, setResumeURL] = useState('')

  //form validation
  const [valLocation, setValLocation] = useState('')
  const [valRole, setValRole] = useState('')
  const [valStatment, setValStatment] = useState('')

  //resume file
  const [resume, setResume] = useState(null)

  //upload resume to cloudinary
  const uploadResume = async () => {
    const data = new FormData()
    data.append('file', resume)
    data.append('upload_preset', 'jobs.lk-CV')

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/aghb/image/upload',
        data
      )
      return uploadRes?.data?.secure_url
    } catch (error) {
      toast.error('error in uploading CV', { theme: 'dark' })
    }
  }

  const [skill, setSkills] = useState('')
  const [YOE, setYOE] = useState('')

  //uploadcv button
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click()
  }
  //remove skills
  const removeSkill = (skillToRemove) => {
    const index = skillData.findIndex(({ skill }) => skill === skillToRemove)
    if (index !== -1) {
      setskillData([
        ...skillData.slice(0, index),
        ...skillData.slice(index + 1),
      ])
    }
  }
  //update  resume
  const Update = async () => {
    if (Location.length < 3) {
      setValLocation('Location should be more that 3 characters')
    } else {
      setValLocation('')
    }
    if (PrimaryRole.length < 3) {
      setValRole('Primary Role should be more that 3 characters')
    } else {
      setValRole('')
    }
    if (Statement.length < 3) {
      setValStatment('Statement should be more that 3 characters')
    } else {
      setValStatment('')
    }
    if (
      !resumeURL ||
      Location.length < 3 ||
      PrimaryRole.length < 3 ||
      Statement.length < 3
    ) {
      return
    }
    setisLoading(true)

    if (resume == null) {
      //resume not update
      const API_URL = `candidate/updateResume`
      const response = await api.post(API_URL, {
        userID: user.userId,
        skills: skillData,
        Location: Location,
        PrimaryRole: PrimaryRole,
        Statement: Statement,
      })
      getResume()
      setisLoading(false)
      toast.info(response.data.msg, { theme: 'dark' })
    } else {
      //resume  updated
      const CVData = await uploadResume()
      const API_URL = `candidate/updateResume`
      const response = await api.post(API_URL, {
        userID: user.userId,
        skills: skillData,
        Location: Location,
        PrimaryRole: PrimaryRole,
        Statement: Statement,
        CV: CVData,
      })

      getResume()
      setisLoading(false)
      toast.info(response.data.msg, { theme: 'dark' })
    }
  }
  //add skill
  const AddSkill = (e) => {
    if (!skill) {
      toast.info('skill cannot be empty', { theme: 'dark' })
      return
    }
    if (!YOE) {
      toast.info('Years of experience cannot be empty', { theme: 'dark' })
      return
    }
    const data = {
      skill: skill,
      YOE: YOE,
    }
    const skillToCheck = skill
    const index = skillData.findIndex(({ skill }) => skill === skillToCheck)
    if (index !== -1) {
      toast.info('Skill already added', { theme: 'dark' })
      return
    }
    setskillData([...skillData, data])
  }
  //get resume to check if it already exists
  const getResume = async () => {
    const API_URL = `candidate/viewResume/${user.userId}`
    const response = await api.get(API_URL)
    if (response.data.find !== null) {
      setLocation(response.data.find.Location)
      setPrimaryRole(response.data.find.PrimaryRole)
      setStatement(response.data.find.Statement)
      setskillData(response.data.find.skills)
      setresumeData(response.data.find.CV.slice(68).slice(0, -11) + '.pdf')
      setResumeURL(response.data.find.CV)
    }
  }
  const removeResume = async () => {
    const API_URL = `candidate/removeResume/${user.userId}`
    const response = await api.delete(API_URL)
    window.location.reload()
    toast.info(response.data.msg, { theme: 'dark' })
  }
  useEffect(() => {
    getResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>View/Manage Your Resume</h1>
      </header>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='flex justify-center pt-4'>
            <div className='box-border h-auto w-4/5  pt-4 '>
              <div className='flex'>
                <button
                  onClick={Update}
                  type='button'
                  className=' flex font-medium rounded-md text-white text-md  px-4 py-2.5  bg-green-700 hover:bg-green-500 focus:outline-none'
                >
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-4 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                      />
                    </svg>
                  </div>
                  <div className='pl-2'>Update</div>
                </button>
                <div className='pl-4'>
                  <button
                    onClick={removeResume}
                    type='button'
                    className=' flex font-medium rounded-md text-white text-md  px-4 py-2.5  bg-red-600 hover:bg-red-400 focus:outline-none'
                  >
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-4 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                        />
                      </svg>
                    </div>
                    <div className='pl-2'>Reset</div>
                  </button>
                </div>
              </div>
              <p className='font-sans text-2xl pt-12'>About You</p>
              <div className='pt-12 pl-6 pr-6'>
                <p className='font-sans text-xl font-bold'>
                  CV <span className='font-sans text-sm font-bold'>(PDF) </span>
                </p>
                <div className='flex justify-center items-center  box-border h-60 shadow-md border-2  rounded-lg w-full  '>
                  <p className='font-sans text-sm font-bold'>
                    <a href={resumeURL}>{resumeData}</a>{' '}
                  </p>
                  <div className='flex'>
                    <button onClick={onButtonClick} className='flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-10 h-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15'
                        />
                      </svg>
                    </button>
                    <input
                      type='file'
                      id='file'
                      accept='application/pdf'
                      ref={inputFile}
                      onChange={(e) => {
                        setResume(e.target.files[0])
                        setresumeData(e.target.files[0].name)
                      }}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
                <div className='pt-4'>
                  <p className='font-sans text-xl font-bold'>
                    Where do you live
                  </p>
                  <input
                    type='text'
                    defaultValue={Location}
                    onChange={(e) => {
                      setLocation(e.target.value)
                    }}
                    placeholder='Sri Lanka'
                    className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5'
                  />
                </div>
                <p className='text-xs text-red-500 pt-0.5'>{valLocation}</p>
                <div className='pt-4'>
                  <p className='font-sans text-xl font-bold'>
                    Whats your primary Role
                  </p>
                  <input
                    type='text'
                    defaultValue={PrimaryRole}
                    onChange={(e) => {
                      setPrimaryRole(e.target.value)
                    }}
                    placeholder='eg: Student'
                    className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  p-2.5'
                  />
                </div>
                <p className='text-xs text-red-500 pt-0.5'>{valRole}</p>
                <div className='pt-4'>
                  <p className='font-sans text-xl font-bold'>
                    Personal Statment
                  </p>
                  <textarea
                    type='text'
                    defaultValue={Statement}
                    onChange={(e) => {
                      setStatement(e.target.value)
                    }}
                    placeholder='Opt...'
                    className='bg-gray-50  shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full resize-y p-2.5'
                  />
                </div>
                <p className='text-xs text-red-500 pt-0.5'>{valStatment}</p>
                <div className='pt-4'>
                  <p className='font-sans text-xl font-bold'>Skills</p>
                  <div className='flex'>
                    <input
                      type='text'
                      placeholder='eg:java'
                      onChange={(e) => {
                        setSkills(e.target.value)
                      }}
                      className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5'
                    />
                    <div className='pl-2'></div>
                    <input
                      type='number'
                      placeholder='years of experience'
                      onChange={(e) => {
                        setYOE(e.target.value)
                      }}
                      className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5'
                    />
                  </div>
                </div>
                <div className='flex justify-center pt-12'>
                  <button type='button' onClick={AddSkill}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-10 h-10'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
                {skillData.map((skill) => (
                  <div key={skill.skill} className='pt-4'>
                    <div className='flex pl-4'>
                      <div
                        type='text'
                        placeholder='eg:java'
                        onChange={(e) => {
                          setSkills(e.target.value)
                        }}
                        className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5'
                      >
                        {skill.skill}
                      </div>
                      <div className='pl-2'></div>
                      <div
                        type='text'
                        placeholder='years of experience'
                        onChange={(e) => {
                          setYOE(e.target.value)
                        }}
                        className='bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5'
                      >
                        {skill.YOE}
                      </div>
                      <button
                        className='no-underline pl-2 hover:underline text-red-700 pr-4'
                        onClick={(e) => {
                          removeSkill(skill.skill)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ViewProfile
