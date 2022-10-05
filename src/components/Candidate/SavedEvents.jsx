import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { applyEvent } from '../../features/ui/uiSlice'
import moment from 'moment'

const SavedEvents = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  //saved events
  const [savedEvents, setSavedEvents] = useState([])

  //get all saved Events
  const getSavedEvents = async () => {
    const API_URL = `candidate/getsaveEvents/${user.userId}`
    const response = await api.get(API_URL)
    let mapped = response.data.find.map((ele) => ele.EventID)
    setSavedEvents(mapped)
  }
  //remove from saved
  const removeEvent = async (Jid) => {
    let text = 'Are You sure you want to unsave event'
    if (window.confirm(text) === true) {
      try {
        const API_URL = `candidate/delsaveEvent/${Jid}`
        const response = await api.delete(API_URL)
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        console.log('err', error)
        toast.error('error', { theme: 'dark' })
      }
    } else {
      return
    }
    getSavedEvents()
  }
  //onclcik event
  const onClickApply = async (event) => {
    dispatch(applyEvent({ state: true, viewData: event }))
    navigate('/candidate/view-event')
  }
  useEffect(() => {
    if (user !== null) {
      getSavedEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        {savedEvents.map((event) => (
          <div key={event._id} className='flex flex-col pt-4 ...'>
            <div className=' h-56 w-full bg-gray-50 rounded-lg  shadow-md'>
              <div className=' h-5/6 w-full pl-4 pt-4 bg-white rounded-t-lg '>
                <div className='flex justify-end pr-6'>
                  <div className=''>
                    <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-200 text-blue-800'>
                      {event.deliveryType}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      onClickApply(event)
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M8.25 4.5l7.5 7.5-7.5 7.5'
                      />
                    </svg>
                  </button>
                </div>
                <div className='flex'>
                  <img
                    src={event.company.photoUrl}
                    alt='company-img'
                    className='object-cover h-24 w-24 rounded-lg shadow-2xl'
                  />
                  <div className='pl-4 grid grid-cols-1'>
                    <div className='font-sans text-4xl font-bold'>
                      {event.eventTitle}
                    </div>
                    <div className='flex pt-6'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                        />
                      </svg>
                      {event.location}
                    </div>
                    <div>
                      <p className='truncate text-sm pl-4 text-gray-500'>
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='grid grid-cols-2'>
                  <div className='pl-4 pt-2 w-full'>
                    {moment(event.date).utc().format('YYYY-MM-DD')} |{' '}
                    {moment(event.date).utc().format('h:mm a')}
                  </div>
                  <div className='flex justify-end pr-4 pt-2'>
                    <button title='login to save'>
                      <div className='pr-4 pl-4 '>
                        <button
                          onClick={(e) => {
                            removeEvent(event._id)
                          }}
                          className='no-underline hover:underline text-red-700'
                        >
                          Remove
                        </button>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SavedEvents
