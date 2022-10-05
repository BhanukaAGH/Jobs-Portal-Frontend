import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import axios from 'axios'
import { urlPattern } from '../../constants/pattern'
import { useSelector, useDispatch } from 'react-redux'
import { getCompany, updateCompany } from '../../features/company/companySlice'
import Loading from '../Loading'

const CompanyDashboard = () => {
  const [profileImg, setProfileImg] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { company, isLoading } = useSelector((state) => state.company)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: company?.name,
      email: company?.email,
      companyWebsite: company?._company?.companyWebsite,
      companyLocation: company?._company?.companyLocation,
      numberOfEmployees: company?._company?.numberOfEmployees,
      companyDescription: company?._company?.companyDescription,
    },
  })

  // Check select image is valid
  const handleProfileImage = (e) => {
    const file = e.target.files[0]
    if (file?.size >= 2000000) {
      toast('File Size is too large', { type: 'error' })
      return
    }
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file?.type)) {
      toast('Unsupported File Format', { type: 'error' })
      return
    }

    setProfileImg(file)
  }

  // Upload profile image to cloudinary
  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', profileImg)
    data.append('upload_preset', 'jobs.lk')

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/aghb/image/upload',
        data
      )

      return uploadRes?.data?.secure_url
    } catch (error) {
      console.log(error)
    }
  }

  // After save button click this function(update company) occur
  const onSubmit = async (data) => {
    setIsEdit(false)
    const id = toast('Please wait...', { isLoading: true })

    let profileUrl
    if (profileImg) {
      profileUrl = await uploadImage()
    }

    const companyData = {
      id: user?.userId,
      name: data.name,
      email: data.email,
      _company: {
        companyWebsite: data.companyWebsite,
        companyLocation: data.companyLocation,
        numberOfEmployees: data.numberOfEmployees,
        companyDescription: data.companyDescription,
      },
      photoUrl: profileUrl || company?.photoUrl,
    }

    dispatch(updateCompany(companyData))
    toast('Success! Company profile updated.', {
      toastId: id,
      updateId: id,
      type: 'success',
      isLoading: false,
    })
    setProfileImg(null)
  }

  // Get company data initial load
  useEffect(() => {
    dispatch(getCompany(user?.userId))
  }, [user, dispatch])

  // Reset form data after successfully get company data
  useEffect(() => {
    reset({
      name: company?.name,
      email: company?.email,
      companyWebsite: company?._company?.companyWebsite,
      companyLocation: company?._company?.companyLocation,
      numberOfEmployees: company?._company?.numberOfEmployees,
      companyDescription: company?._company?.companyDescription,
    })
  }, [company, reset])

  if (isLoading) return <Loading />

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Company Details</h3>
        <div>
          {isEdit && (
            <button
              type='submit'
              form='company-form'
              className='dashbord-title-button bg-[#312ECB]'
            >
              Save
            </button>
          )}
          {!isEdit && (
            <button
              className='dashbord-title-button'
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className='dashboard-content'>
        <div className='grid grid-cols-12 w-full h-full px-3 md:px-6 py-6 overflow-auto scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
          <div className='col-span-12 lg:col-span-9 w-full h-full'>
            <form
              id='company-form'
              className='grid grid-cols-6 gap-3 pr-12'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='col-span-6 lg:col-span-3'>
                <label
                  htmlFor='company-name'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company name
                </label>
                <input
                  type='text'
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                />
                {errors.name && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className='col-span-6 lg:col-span-3'>
                <label
                  htmlFor='company-email'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company email
                </label>
                <input
                  type='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                />
                {errors.email && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.email.message}
                  </p>
                )}
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
                  {...register('companyWebsite', {
                    pattern: {
                      value: urlPattern,
                      message: 'Please enter a valid url',
                    },
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                />
                {errors.companyWebsite && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.companyWebsite.message}
                  </p>
                )}
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
                  {...register('companyLocation', {
                    required: 'Company location is required',
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                />
                {errors.companyLocation && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.companyLocation.message}
                  </p>
                )}
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
                  {...register('numberOfEmployees', {
                    required: 'Please select the value',
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                >
                  <option value='1 to 49'>1 to 49</option>
                  <option value='50 to 149'>50 to 149</option>
                  <option value='150 to 249'>150 to 249</option>
                  <option value='250 to 499'>250 to 499</option>
                  <option value='500 to 749'>500 to 749</option>
                  <option value='750 to 999'>750 to 999</option>
                  <option value='1000+'>1000+</option>
                </select>
                {errors.numberOfEmployees && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.numberOfEmployees.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='company-description'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company description
                </label>
                <textarea
                  {...register('companyDescription', {
                    required: 'Company description is required',
                    minLength: {
                      value: 20,
                      message: 'Description is too short',
                    },
                    maxLength: {
                      value: 500,
                      message: 'Description is too long',
                    },
                  })}
                  rows='3'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  disabled={!isEdit}
                />
                {errors.companyDescription && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.companyDescription.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          <div className='order-first lg:order-none col-span-12 lg:col-span-3 w-full h-full'>
            <div className='flex items-center justify-center w-48 h-48 bg-white p-6 shadow-lg rounded-xl mb-8 relative'>
              <img
                src={company?.photoUrl}
                alt='company-logo'
                className={`w-24 object-cover ${isEdit && 'blur-md'}`}
              />
              {isEdit && (
                <label
                  htmlFor='profile'
                  className='absolute inset-0 flex flex-col items-center justify-center bg-transparent rounded-md cursor-pointer'
                >
                  <MdOutlineCloudUpload className='text-6xl' />
                  <p className='font-[Poppins] text-lg'>Change profile</p>
                  <input
                    id='profile'
                    type='file'
                    onChange={handleProfileImage}
                    className='hidden'
                  />
                </label>
              )}
            </div>
            {errors.profile && (
              <p className='text-xs text-red-500 pt-0.5'>
                {errors.profile.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
