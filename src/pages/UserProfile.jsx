import React from 'react'
import Navbar from '../components/Home/Navbar'
import ViewProfile from '../components/Candidate/ViewProfile'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useEffect } from 'react'
import api from '../utils/api'

//setup user profile
const UserProfile = () => {
  const { authModal } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const inputFile = useRef(null)
  //form data
  const [Location, setLocation] = useState("")
  const [PrimaryRole, setPrimaryRole] = useState("")
  const [Statement, setStatement] = useState("")
  const [skillData, setskillData] = useState([])

  //resumeexits or not
  const [resumeExist, setresumeExist] = useState('')

  const [skill, setSkills] = useState("")
  const [YOE, setYOE] = useState("")
  
  //uploadcv button
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  //remove skills  
  const removeSkill = (skillToRemove) => {
    const index = skillData.findIndex(({ skill }) => skill === skillToRemove);
    if (index !== -1) {
      setskillData([
        ...skillData.slice(0, index),
        ...skillData.slice(index + 1)
      ])
    }
  }
  //add resume
  const add = async() => {
    if(!Location){
      toast.info("Location should be filled", { theme: 'dark' })
      return;
    }
    if( Location.length<6){
      toast.info("Location Lenth should be more than 5 character", { theme: 'dark' })
      return;
    }
    if(!PrimaryRole){
      toast.info("role should be filled", { theme: 'dark' })
      return;
    }
    if( PrimaryRole.length<6){
      toast.info("Role Lenth should be more than 5 character", { theme: 'dark' })
      return;
    }
    const API_URL = `candidate/addResume`
    const response = await api.post(API_URL,{
      userID:user.userId,
      skills:skillData,
      Location:Location,
      PrimaryRole:PrimaryRole,
      Statement:Statement
    });
    getResume()
    toast.info(response.data.msg, { theme: 'dark' })
  }
  //add skill
  const AddSkill = (e) => {
    if (!skill) {
      toast.info("skill cannot be empty", { theme: 'dark' })
      return
    }
    if (!YOE) {
      toast.info("Years of experience cannot be empty", { theme: 'dark' })
      return
    }
    const data = {
      skill: skill,
      YOE: YOE
    }
    const skillToCheck = skill
    const index = skillData.findIndex(({ skill }) => skill === skillToCheck);
    if (index !== -1) {
      toast.info("Skill already added", { theme: 'dark' })
      return
    }
    setskillData([...skillData, data])
  }
  //get resume to check if it already exists
  const getResume=async()=>{
    const API_URL = `candidate/viewResume/${user.userId}`
    const response = await api.get(API_URL);
    setresumeExist(response.data.find)
  }
  useEffect(() => {
    getResume();
  }, [])

  if( resumeExist===null){
  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>Set Your Profile</h1>
      </header>
      <div className='flex justify-center pt-4'>
        <div className="box-border h-auto w-4/5  pt-4 ">
          <div className='flex'>
            <button onClick={add} type="button" class=" flex font-medium rounded-md text-white text-md  px-4 py-2.5   bg-[#312ECB] hover:bg-blue-700 focus:outline-none">
              <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              </div>
              <div className='pl-2'>Add</div>
            </button>
          </div>
          <p className='font-sans text-2xl pt-12'>About You</p>
          <div className='pt-12 pl-6 pr-6'>
            <div className="flex justify-center items-center  box-border h-60 shadow-md border-2  rounded-lg w-full  ">
              <div className='flex'>
                <button onClick={onButtonClick} className='flex'>
                  <p className='font-sans text-2xl font-bold'>Upload CV</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                  </svg>
                </button>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
              </div>
            </div>
            <div className='pt-4'>
              <p className='font-sans text-xl font-bold'>Where do you live</p>
              <input type="text" onChange={(e)=>{setLocation(e.target.value)}} placeholder='Sri Lanka' className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5" required/>
            </div>
            <div className='pt-4'>
              <p className='font-sans text-xl font-bold'>Whats your primary Role</p>
              <input type="text" onChange={(e)=>{setPrimaryRole(e.target.value)}} placeholder='eg: Student' className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  p-2.5" required/>
            </div>
            <div className='pt-4'>
              <p className='font-sans text-xl font-bold'>Personal Statment</p>
              <textarea type="text" onChange={(e)=>{setStatement(e.target.value)} } placeholder='Opt...' className="bg-gray-50  shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full resize-y p-2.5" />
            </div>
            <div className='pt-4'>
              <p className='font-sans text-xl font-bold'>Skills</p>
              <div className='flex'>
                <input type="text" placeholder='eg:java' onChange={(e) => { setSkills(e.target.value) }} className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5" />
                <div className='pl-2'></div>
                <input type="number" placeholder='years of experience' onChange={(e) => { setYOE(e.target.value) }} className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5" />
              </div>
            </div>
            <div className='flex justify-center pt-12'>
              <button onClick={AddSkill} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            {skillData.map((skill) => (
              <div key={skill.skill} className='pt-4'>
                <div className='flex pl-4'>
                  <div type="text" placeholder='eg:java' onChange={(e) => { setSkills(e.target.value) }} className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5" >{skill.skill}</div>
                  <div className='pl-2'></div>
                  <div type="text" placeholder='years of experience' onChange={(e) => { setYOE(e.target.value) }} className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5" >{skill.YOE}</div>
                  <button className='no-underline pl-2 hover:underline text-red-700 pr-4' onClick={(e) => { removeSkill(skill.skill) }} >Remove</button>
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
    </div>
  )
}
if( resumeExist!==null){
    return (<ViewProfile/>)
    // return (<h1>hi</h1>)
}
}

export default UserProfile
