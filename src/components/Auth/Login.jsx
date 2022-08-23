import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { openAuth } from '../../features/ui/uiSlice'
import { emailPattern } from '../../constants/pattern'

const Login = ({ setOpenLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: 'dark' })
    }

    if (isSuccess || user) {
      if (user?.role === 'admin') {
        navigate(state?.path || '/admin/dashboard')
      } else if (user?.role === 'company') {
        navigate(state?.path || '/company/dashboard')
      } else {
        navigate('/')
      }
      dispatch(openAuth(false))
    }

    dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className='rounded-lg bg-white shadow font-[Mulish]'>
      <div className='p-6 md:p-12'>
        <p className='text-sm text-[#757575] pb-1'>Welcome back! 👋</p>
        <h3 className='mb-6 text-xl text-gray-900 font-bold'>
          Sign in to your account
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='email' className='input-label'>
              Your email
            </label>
            <input
              type='text'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Please enter a valid email address',
                },
              })}
              className='auth-modal-input'
              placeholder='email address'
            />
            {errors.email && (
              <p className='text-xs text-red-500 pt-0.5'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='mb-8'>
            <label htmlFor='password' className='input-label'>
              Password
            </label>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder='password'
              className='auth-modal-input'
            />
            {errors.password && (
              <p className='text-xs text-red-500 pt-0.5'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className={`w-full rounded-lg bg-[#312ECB] px-5 ${
              isLoading ? 'py-1' : 'py-3'
            } text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase flex items-center justify-center`}
          >
            {isLoading ? (
              <Oval
                height={30}
                width={30}
                color='#fff'
                secondaryColor='#4fa94d'
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              'Login'
            )}
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
