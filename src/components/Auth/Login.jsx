import React from 'react'

const Login = ({ setOpenLogin }) => {
  return (
    <div className='rounded-lg bg-white shadow font-[Mulish]'>
      <div className='p-6 md:p-12'>
        <p className='text-sm text-[#757575] pb-1'>Welcome back! 👋</p>
        <h3 className='mb-6 text-xl text-gray-900 font-bold'>
          Sign in to your account
        </h3>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Your email
            </label>
            <input
              type='email'
              name='email'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              placeholder='email address'
            />
          </div>

          <div className='mb-8'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='password'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-lg bg-[#312ECB] px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'
          >
            Login
          </button>
        </form>
        <p className='text-sm w-full text-center mt-6 font-bold text-[#6B7E8B]'>
          If you don't have an account?
          <span
            className='text-[#625BF7] cursor-pointer'
            onClick={() => setOpenLogin(false)}
          >
            {' '}
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
