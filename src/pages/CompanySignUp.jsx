import React from 'react'
import Logo from '../assets/Logo.png'
import BGImage from '../assets/registerBg.png'

const CompanySignUp = () => {
  return (
    <div className='grid grid-cols-8 w-screen h-screen'>
      <div className='col-span-8 lg:col-span-5 w-full font-[Mulish]'>
        <div className='w-10/12 md:w-2/3 mx-auto pt-12 pb-8'>
          <div className='flex items-center gap-x-2 md:mr-12 lg:mr-16 cursor-pointer'>
            <img src={Logo} alt='website-logo' className='w-14' />
            <p className='text-4xl font-bold text-black font-[Domine]'>
              Jobs.lk
            </p>
          </div>

          <div className='mt-4 mb-6 '>
            <p className='font-bold text-xl'>Create an employer account</p>
            <span className='text-sm text-[#757575]'>
              You haven’t posted a job before, so you’ll need to create an
              employer account.
            </span>
          </div>

          <form className='grid grid-cols-6 gap-3'>
            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='company-name'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Company name
              </label>
              <input
                type='text'
                name='company-name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='company name'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='company-email'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Company email
              </label>
              <input
                type='email'
                name='company-email'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='company email'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-website'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Company website{' '}
                <span className='text-[#333333]/50'>(optional)</span>
              </label>
              <input
                type='url'
                name='company-website'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='company website url'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-location'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Company location
              </label>
              <input
                type='text'
                name='company-location'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='company location'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-employees'
                className='block text-sm font-medium text-gray-700'
              >
                Company's number of employees
              </label>
              <select
                id='company-employees'
                name='company-employees'
                autoComplete='country-name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
              >
                <option>1 to 49</option>
                <option>50 to 149</option>
                <option>150 to 249</option>
                <option>250 to 499</option>
                <option>500 to 749</option>
                <option>750 to 999</option>
                <option>1000+</option>
              </select>
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-description'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Company description
              </label>
              <textarea
                name='company-description'
                rows='3'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='company description'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-password'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Password
              </label>
              <input
                type='password'
                name='company-password'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='**********'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='company-repassword'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Confirm password
              </label>
              <input
                type='password'
                name='company-repassword'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                placeholder='**********'
              />
            </div>

            <button className='mt-4 col-span-6 bg-black text-white rounded-lg w-full p-3 hover:bg-gray-700'>
              Create an Account
            </button>
          </form>
        </div>
      </div>
      <div className='hidden lg:block col-span-3 w-full relative bg-slate-600'>
        <img
          src={BGImage}
          alt='right-bg'
          className='absolute inset-0 h-full object-cover w-full'
        />
      </div>
    </div>
  )
}

export default CompanySignUp
