import React from 'react'
import { Link } from 'react-router-dom'
import DashboardNav from '../components/Dashboard/DashboardNav'
import PostJobImage from '../assets/postJob.webp'
import { MdAdd } from 'react-icons/md'

const PostJob = () => {
  return (
    <div className='bg-[#F3F2F1] min-h-screen'>
      <DashboardNav />

      <div className='flex flex-col items-center justify-center gap-y-6 pt-6 pb-12 w-full sm:w-[600px] md:w-[650px] lg:w-[700px] mx-auto px-3'>
        {/* Section 01 */}
        <div className='post-job-section !py-0 font-[Poppins] text-3xl md:text-4xl font-semibold overflow-hidden'>
          <h2 className='md:max-w-xs leading-10'>Provide Job Information</h2>
          <img src={PostJobImage} alt='post-img' className='max-h-48' />
        </div>

        {/* Section 02 */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-4 w-full'>
            <div className='col-span-6 md:col-span-2 row-span-1 flex items-center justify-center bg-[#F3F2F1]/80 rounded-xl shadow-md h-40 aspect-square md:aspect-auto md:h-auto sm:mx-auto md:mx-0'>
              <img
                src='https://img.icons8.com/color/48/000000/google-logo.png'
                alt='company-logo'
                className='w-24 object-cover'
              />
            </div>
            <div className='col-span-6 md:col-span-4 row-span-1 font-[Mulish] font-bold'>
              <div className='grid grid-cols-6 gap-3'>
                <div className='col-span-6'>
                  <p>Company Name :</p>
                  <p className='w-full text-[#7A7A7A]'>Google LLC</p>
                </div>

                <div className='col-span-6'>
                  <p>Company Description :</p>
                  <p className='w-full text-[#7A7A7A]'>
                    Google, in full Google LLC formerly Google Inc. (1998–2017),
                    American search engine company, founded in 1998 by Sergey
                    Brin and Larry Page, that is a subsidiary of the holding
                    company Alphabet Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-3 w-full'>
            <div className='col-span-6'>
              <label
                htmlFor='job-title'
                className='mb-1 block text-sm font-medium'
              >
                Job title <span className='text-red-500 font-bold'>*</span>
              </label>
              <input
                type='text'
                name='job-title'
                className='input-field'
                placeholder='job title'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-title'
                className='mb-1 block text-sm font-medium'
              >
                Job category <span className='text-red-500 font-bold'>*</span>
              </label>
              <select id='job-title' name='job-title' className='input-field'>
                <option>IT/Telecommunication</option>
                <option>Management</option>
                <option>Digital & Creative</option>
                <option>Sales & Marketing</option>
                <option>Accounting</option>
                <option>Design & Art</option>
              </select>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-type'
                className='mb-1 block text-sm font-medium'
              >
                What is the job type?{' '}
                <span className='text-red-500 font-bold'>*</span>
              </label>
              <select id='job-type' name='job-type' className='input-field'>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
                <option>Internship</option>
              </select>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-description'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Job description
              </label>
              <textarea
                name='job-description'
                rows='4'
                className='input-field'
                placeholder='Job description'
              />
            </div>
          </div>
        </div>

        {/* Section 04 */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-3 w-full'>
            <div className='col-span-6'>
              <label
                htmlFor='country'
                className='mb-1 block text-sm font-medium'
              >
                Country <span className='text-red-500 font-bold'>*</span>
              </label>
              <select id='country' name='country' className='input-field'>
                <option>Sri Lanka</option>
                <option>USA</option>
                <option>India</option>
              </select>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='work-type'
                className='mb-1 block text-sm font-medium'
              >
                Which option best describes this job's location?
                <span className='text-red-500 font-bold'> *</span>
              </label>
              <select id='work-type' name='work-type' className='input-field'>
                <option>Remote</option>
                <option>In person</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-3 w-full'>
            <div className='col-span-6'>
              <label
                htmlFor='number-of-vacancy'
                className='mb-1 block text-sm font-medium'
              >
                How many people do you want to hire for this opening?{' '}
                <span className='text-red-500 font-bold'>*</span>
              </label>
              <select
                id='number-of-vacancy'
                name='number-of-vacancy'
                className='input-field'
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-deadline'
                className='mb-1 block text-sm font-medium'
              >
                When is the deadline for this job?
                <span className='text-red-500 font-bold'> *</span>
              </label>
              <input type='date' name='job-deadline' className='input-field' />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-salary'
                className='mb-1 block text-sm font-medium'
              >
                What is the average salary for this job?
                <span className='text-red-500 font-bold'> *</span>
              </label>
              <input
                type='number'
                name='job-salary'
                className='input-field'
                placeholder='$ 4000.00'
              />
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-3 w-full'>
            <div className='col-span-6'>
              <label
                htmlFor='job-requirements'
                className='mb-1 block text-sm font-medium'
              >
                Job requirements{' '}
                <span className='text-red-500 font-bold'>*</span>
              </label>
              <ul className='mb-2 list-disc pl-8'>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores.
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores.
                </li>
              </ul>
              <div className='flex space-x-2 items-center w-full h-10'>
                <input
                  type='text'
                  name='job-requirements'
                  className='input-field h-full'
                />
                <MdAdd className='px-2 w-10 h-10 text-white bg-black rounded-lg cursor-pointer' />
              </div>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='job-expectations'
                className='mb-1 block text-sm font-medium'
              >
                Job expectations{' '}
                <span className='text-red-500 font-bold'>*</span>
              </label>
              <ul className='mb-2 list-disc pl-8'>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores.
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores.
                </li>
              </ul>
              <div className='flex space-x-2 items-center w-full h-10'>
                <input
                  type='text'
                  name='job-expectations'
                  className='input-field h-full'
                />
                <MdAdd className='px-2 w-10 h-10 text-white bg-black rounded-lg cursor-pointer' />
              </div>
            </div>
          </div>
        </div>

        {/* Section 07 */}
        <div className='post-job-section font-[Poppins]'>
          <Link
            to={'/company/dashboard'}
            className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Back
          </Link>
          <button className='text-white bg-[#312ECB] hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
            Post a Job
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostJob
