import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../utils/api'
import Navbar from '../Home/Navbar'
import { toast } from 'react-toastify'
import Loading from '../Loading'
import BGImage from '../../assets/bg.webp'
import moment from 'moment'
import { useForm } from 'react-hook-form'


const ViewEvent = () => {
  const { eventApply } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const { authModal } = useSelector((state) => state.ui)

  //store saved events
  const [savedEvent, setsavedEvent] = useState([])

  //for loading animation
  const [isLoading, setisLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  //get all saved events
  const getSavedEvents = async () => {
    const API_URL = `candidate/getsaveEvent/${user.userId}`
    const response = await api.get(API_URL)
    let mapped = response.data.find.map((ele) => ele.EventID)
    setsavedEvent(mapped)
  }
  //save event
  const saveEvent = async () => {
    if (savedEvent.includes(eventApply.viewData._id)) {
      //delete job
      try {
        const API_URL = `candidate/delsaveEvent/${eventApply.viewData._id}`
        const response = await api.delete(API_URL)
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        console.log('err', error)
        toast.error('error', { theme: 'dark' })
      }
    } else {
      //save job
      try {
        const API_URL = `candidate/saveEvent`
        const response = await api.post(API_URL, {
          userID: user.userId,
          EventID: eventApply.viewData._id,
        })
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        toast.error('error', { theme: 'dark' })
      }
    }
    getSavedEvents()
  }
  //on submit
  const onSubmit = async (data) => {
    try {
      const API_URL = `candidate/applyEvent`
      const response = await api.post(API_URL, {
        EventID: eventApply.viewData._id,
        CompanyID: eventApply.viewData.company._id,
        FName: data.fname,
        LName: data.Lname,
        Email: data.email,
        Country: data.country,
        Role: data.role,
      })
      setisLoading(false)
      toast.info(response.data.msg, { theme: 'dark' })
    } catch (error) {
      setisLoading(false)
      toast.info('Error when signing up', { theme: 'dark' })
    }
  }

  useEffect(() => {
    if (user !== null) {
      getSavedEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={`${authModal && 'h-screen overflow-hidden'}`}>
        <Navbar />
        <header className='relative h-72 bg-[#14163A] flex  items-center'>
          <br />
          <div className='pt-10 pl-10 pr-10 w-full '>
            <div className='box-content h-48 w-full '>
              <div className='relative pl-4 pr-4 pt-4 h-full '>
                <img
                  src={eventApply.viewData.company.photoUrl}
                  alt='job-img'
                  className='float-left object-cover bg-white h-36 w-36 rounded-lg shadow-2xl'
                />
                <div className='pl-48'>
                  <div className='w-3/4'>
                    <h1 className='text-white font-sans text-4xl font-bold'>
                      {eventApply.viewData.eventTitle}
                    </h1>
                    <br />
                    <h1 className='text-white font-sans text-2xl font-bold'>
                      Company: {eventApply.viewData.company.name}
                    </h1>
                    <h1 className='text-white font-sans text-xl font-bold'>
                      Category: {eventApply.viewData.company.name}
                    </h1>
                  </div>
                </div>
                <h1 className='text-white absolute right-4 top-6 '>
                  Posted On:{''}
                  {moment(eventApply.viewData.createdAt).utc().format('YYYY-MM-DD')}
                </h1>
                {/* Saved Button */}
                {savedEvent.includes(eventApply.viewData._id) && (
                  <button onClick={saveEvent}>
                    <h1 className='text-white absolute float-right right-10 bottom-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        class='w-6 h-6'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
                          clip-rule='evenodd'
                        />
                      </svg>
                    </h1>
                  </button>
                )}
                {/* save button */}
                {!savedEvent.includes(eventApply.viewData._id) && (
                  <button onClick={saveEvent}>
                    <h1 className='text-white absolute float-right right-10 bottom-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='w-6 h-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                        />
                      </svg>
                    </h1>
                  </button>
                )}
                {/* bloaked button */}
                {user === null && (
                  <button
                    title='login to save'
                    disabled={true}
                    className='cursor-not-allowed'
                  >
                    <h1 className='text-white absolute float-right right-10 bottom-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='w-6 h-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5'
                        />
                      </svg>
                    </h1>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='flex'>
              <div className='pl-36 w-1/2 pr-6'>
                <div className='box-content h-auto w-full  pt-6 '>
                  <h1 className='text-lg font-sans font-bold'>About Event</h1>
                  <p className=''>{eventApply.viewData.description}</p>
                </div>
              </div>
              <div className='pl-10 w-1/2 pr-6'>
                <div className='pt-10 pl-36'>
                  <img
                    src={BGImage}
                    alt='event-img'
                    className='float-left object-cover bg-white h-64 w-98 shadow-xl'
                  />
                </div>
              </div>
            </div>
            <br />
            <div className='pl-36 pr-10 pb-6'>
              <div className='box-content h-14 w-full pt-2'>
                <div class='flex '>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
                      />
                    </svg>
                    {eventApply.viewData.location}
                  </div>
                  <div className='flex text-base pl-20 text-slate-600 font-sans font-medium'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    {moment(eventApply.viewData.date)
                      .utc()
                      .format('YYYY-MM-DD')}{' '}
                    | {moment(eventApply.viewData.date).utc().format('h:mm a')}
                  </div>
                </div>
                <div className='flex text-base pt-4 text-slate-600 font-sans font-medium'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                    />
                  </svg>
                  {eventApply.viewData.deliveryType}
                </div>
              </div>
            </div>

            <div className='flex  justify-center pl-10 pr-10 pb-6'>
              <div className='bg-[#E3E1E1] h-2 w-full  rounded-lg'></div>
            </div>
            <div className='flex  justify-center pb-4'>
              <h1 className='text-black font-sans text-4xl font-bold'>
                Take Part in the Event
              </h1>
            </div>
            <div className='pl-40 pr-40'>
              <div className='box-content h-auto w-full  '>
                <div className=''>
                  <div className='flex  justify-center'>
                    <div className='  w-full h-full overflow-auto scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
                      <div></div>
                      <div className='col-span-12 lg:col-span-9 w-full h-full'>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          id=''
                          className='grid  gap-3 '
                        >
                          <div className='col-span-6 lg:col-span-3'>
                            <h1 className='mb-2 block text-sm font-bold text-gray-900'>
                              First Name
                            </h1>
                            <input
                              type='text'
                              placeholder='John'
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                              {...register('fname', {
                                required: 'First Name required',
                                minLength: {
                                  value: 3,
                                  message: 'Name must be at least 3 characters',
                                },
                              })}
                            />
                            {errors.fname && (
                              <p className='text-xs text-red-500 pt-0.5'>
                                {errors.fname.message}
                              </p>
                            )}
                          </div>

                          <div className='col-span-6 lg:col-span-3'>
                            <h1
                              htmlFor='company-email'
                              className='mb-2 block text-sm font-bold text-gray-900'
                            >
                              Last Name
                            </h1>
                            <input
                              type='text'
                              placeholder='Walker'
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                              {...register('Lname', {
                                required: 'Last Name required',
                                minLength: {
                                  value: 3,
                                  message: 'Name must be at least 3 characters',
                                },
                              })}
                            />
                            {errors.Lname && (
                              <p className='text-xs text-red-500 pt-0.5'>
                                {errors.Lname.message}
                              </p>
                            )}
                          </div>

                          <div className='col-span-6'>
                            <label
                              htmlFor='company-website'
                              className='mb-2 block text-sm font-bold text-gray-900'
                            >
                              Email{' '}
                            </label>
                            <input
                              type='email'
                              placeholder='abc@gmail.com'
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                              {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: 'Please enter a valid email address',
                                },
                              })}
                            />
                            {errors.email && (
                              <p className='text-xs text-red-500 pt-0.5'>
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className='col-span-6'>
                            <label
                              htmlFor='company-location'
                              className='mb-2 block text-sm font-bold text-gray-900'
                            >
                              Country
                            </label>
                            <input
                              type='text'
                              placeholder='Sri Lanka'
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                              {...register('country', {
                                required: 'Country required',
                                minLength: {
                                  value: 3,
                                  message:
                                    'Country must be at least 3 characters',
                                },
                              })}
                            />
                            {errors.country && (
                              <p className='text-xs text-red-500 pt-0.5'>
                                {errors.country.message}
                              </p>
                            )}
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='company-location'
                              className='mb-2 block text-sm font-bold text-gray-900'
                            >
                              Role/Occupation
                            </label>
                            <input
                              type='text'
                              placeholder='Student'
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                              {...register('role', {
                                required: 'Role/Ocupation required',
                                minLength: {
                                  value: 3,
                                  message:
                                    'Role/Ocupation must be at least 3 characters',
                                },
                              })}
                            />
                            {errors.role && (
                              <p className='text-xs text-red-500 pt-0.5'>
                                {errors.role.message}
                              </p>
                            )}
                            <div className='pb-10 pt-10 flex justify-center'>
                              <button
                                type='submit'
                                class='focus:outline-none text-white font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900'
                              >
                                Sign-Up
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ViewEvent
