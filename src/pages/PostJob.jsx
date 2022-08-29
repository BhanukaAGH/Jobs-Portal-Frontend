import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardNav from '../components/Dashboard/DashboardNav'
import PostJobImage from '../assets/postJob.webp'
import { MdAdd, MdRemoveCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getCompany } from '../features/company/companySlice'
import Loading from '../components/Loading'
import { useForm, useFieldArray } from 'react-hook-form'
import countries from '../utils/countries.json'

const PostJob = () => {
  const [requirement, setRequirement] = useState('')
  const [expectation, setExpectation] = useState('')

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { company, isLoading } = useSelector((state) => state.company)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {
    fields: requirementFields,
    append: requirementAppend,
    remove: requirementRemove,
  } = useFieldArray({
    control,
    name: 'jobRequirements',
  })

  const {
    fields: expectationFields,
    append: expectationAppend,
    remove: expectationRemove,
  } = useFieldArray({
    control,
    name: 'jobExpectations',
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (!company) {
      dispatch(getCompany(user?.userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading)
    return (
      <div className='h-screen'>
        <Loading />
      </div>
    )

  return (
    <div className='bg-[#F3F2F1] min-h-screen'>
      <DashboardNav />

      <div className='flex flex-col items-center justify-center gap-y-6 pt-6 pb-12 w-full sm:w-[600px] md:w-[650px] lg:w-[700px] mx-auto px-3'>
        {/* Post Job Title Section */}
        <div className='post-job-section !py-0 font-[Poppins] text-3xl md:text-4xl font-semibold overflow-hidden'>
          <h2 className='md:max-w-xs leading-10'>Provide Job Information</h2>
          <img src={PostJobImage} alt='post-img' className='max-h-48' />
        </div>

        {/* Company Brief Detail Section */}
        <div className='post-job-section'>
          <div className='grid grid-cols-6 gap-4 w-full'>
            <div className='col-span-6 md:col-span-2 row-span-1 flex items-center justify-center bg-[#F3F2F1]/80 rounded-xl shadow-md h-40 aspect-square md:aspect-auto md:h-auto sm:mx-auto md:mx-0'>
              <img
                src={company?.photoUrl}
                alt='company-logo'
                className='w-24 object-cover'
              />
            </div>
            <div className='col-span-6 md:col-span-4 row-span-1 font-[Mulish] font-bold'>
              <div className='grid grid-cols-6 gap-3'>
                <div className='col-span-6'>
                  <p>Company Name :</p>
                  <p className='w-full text-[#7A7A7A]'>{company?.name}</p>
                </div>

                <div className='col-span-6'>
                  <p>Company Description :</p>
                  <p className='w-full text-[#7A7A7A]'>
                    {company?._company?.companyDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className='space-y-6 w-full' onSubmit={handleSubmit(onSubmit)}>
          {/* Form 1st Section */}
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
                  {...register('jobTitle', {
                    required: 'Job title is required',
                    minLength: { value: 6, message: 'Job title too short' },
                  })}
                  className='input-field'
                  placeholder='job title'
                />
                {errors.jobTitle && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='job-title'
                  className='mb-1 block text-sm font-medium'
                >
                  Job category <span className='text-red-500 font-bold'>*</span>
                </label>
                <select
                  id='job-title'
                  {...register('jobCategory', {
                    required: 'Please select the job category',
                  })}
                  className='input-field'
                >
                  <option value='IT/Telecommunication'>
                    IT/Telecommunication
                  </option>
                  <option value='Management'>Management</option>
                  <option value='Digital & Creative'>Digital & Creative</option>
                  <option value='Sales & Marketing'>Sales & Marketing</option>
                  <option value='Accounting'>Accounting</option>
                  <option value='Design & Art'>Design & Art</option>
                </select>
                {errors.jobCategory && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.jobCategory.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='job-type'
                  className='mb-1 block text-sm font-medium'
                >
                  What is the job type?{' '}
                  <span className='text-red-500 font-bold'>*</span>
                </label>
                <select
                  id='job-type'
                  {...register('jobType', {
                    required: 'Please select the job type',
                  })}
                  className='input-field'
                >
                  <option value='Full-time'>Full-time</option>
                  <option value='Part-time'>Part-time</option>
                  <option value='Contract'>Contract</option>
                  <option value='Temporary'>Temporary</option>
                  <option value='Internship'>Internship</option>
                </select>
                {errors.jobType && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='job-description'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Job description
                </label>
                <textarea
                  {...register('jobDescription', {
                    required: 'Job description is required',
                    minLength: {
                      value: 20,
                      message: 'Description is too short',
                    },
                    maxLength: {
                      value: 500,
                      message: 'Description is too long',
                    },
                  })}
                  rows='4'
                  className='input-field'
                  placeholder='Job description'
                />
                {errors.jobDescription && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form 2nd Section */}
          <div className='post-job-section'>
            <div className='grid grid-cols-6 gap-3 w-full'>
              <div className='col-span-6'>
                <label
                  htmlFor='country'
                  className='mb-1 block text-sm font-medium'
                >
                  Country <span className='text-red-500 font-bold'>*</span>
                </label>
                <select
                  id='country'
                  {...register('country', {
                    required: 'Please select the value',
                  })}
                  className='input-field'
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.text}>
                      {country.text}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='work-type'
                  className='mb-1 block text-sm font-medium'
                >
                  Which option best describes this job's location?
                  <span className='text-red-500 font-bold'> *</span>
                </label>
                <select
                  id='work-type'
                  {...register('workType', {
                    required: 'Please select the value',
                  })}
                  className='input-field'
                >
                  <option value='Remote'>Remote</option>
                  <option value='In person'>In person</option>
                </select>
                {errors.workType && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.workType.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form 3rd Section */}
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
                  {...register('numberOfVacancy', {
                    required: 'Please select the value',
                  })}
                  className='input-field'
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                {errors.numberOfVacancy && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.numberOfVacancy.message}
                  </p>
                )}
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='job-deadline'
                  className='mb-1 block text-sm font-medium'
                >
                  When is the deadline for this job?
                  <span className='text-red-500 font-bold'> *</span>
                </label>
                <input
                  type='date'
                  {...register('jobDeadline', {
                    required: 'Job Deadline is required',
                  })}
                  className='input-field'
                />
                {errors.jobDeadline && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.jobDeadline.message}
                  </p>
                )}
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
                  type='text'
                  {...register('averageSalary', {
                    required: 'Average salary is required',
                  })}
                  className='input-field'
                  placeholder='$ 4000.00'
                />
                {errors.averageSalary && (
                  <p className='text-xs text-red-500 pt-0.5'>
                    {errors.averageSalary.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form 4th Section */}
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

                {requirementFields.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex items-center space-x-2 pl-2'
                  >
                    <MdRemoveCircle
                      onClick={() => requirementRemove(index)}
                      className='cursor-pointer'
                    />
                    <p>{item.requirement}</p>
                  </div>
                ))}
                <div className='flex space-x-2 items-center w-full h-10 mt-2'>
                  <input
                    type='text'
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='input-field h-full'
                  />
                  <MdAdd
                    onClick={() => {
                      requirementAppend({ requirement })
                      setRequirement('')
                    }}
                    className='px-2 w-10 h-10 text-white bg-black rounded-lg cursor-pointer'
                  />
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
                {expectationFields.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex items-center space-x-2 pl-2'
                  >
                    <MdRemoveCircle
                      onClick={() => expectationRemove(index)}
                      className='cursor-pointer'
                    />
                    <p>{item.expectation}</p>
                  </div>
                ))}
                <div className='flex space-x-2 items-center w-full h-10 mt-2'>
                  <input
                    type='text'
                    value={expectation}
                    onChange={(e) => setExpectation(e.target.value)}
                    className='input-field h-full'
                  />
                  <MdAdd
                    onClick={() => {
                      expectationAppend({ expectation })
                      setExpectation('')
                    }}
                    className='px-2 w-10 h-10 text-white bg-black rounded-lg cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className='post-job-section font-[Poppins]'>
            <Link
              to={'/company/dashboard'}
              className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Back
            </Link>
            <button
              type='submit'
              className='text-white bg-[#312ECB] hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
            >
              Post a Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJob
