import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { applyEvent } from '../../features/ui/uiSlice'
import Loading from '../Loading'

const EventsCards = ({ location, keyword, search, setSearch }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  //store all events
  const [events, setEvents] = useState([])
  //store saved events
  const [savedEvent, setsavedEvent] = useState([])
  const { user } = useSelector((state) => state.auth)

  //store page number
  const [pageNo, setPageNo] = useState(0)
  const [totPages, setTotPages] = useState(0)

  //pageination
  const pages = new Array(totPages).fill(null).map((v, i) => i)
  //previouse pagination
  const prev = () => {
    setPageNo(Math.max(0, pageNo - 1))
  }
  //next pagination
  const next = () => {
    setPageNo(Math.min(totPages - 1, pageNo + 1))
  }
  //get all saved events
  const getSavedEvents = async () => {
    const API_URL = `candidate/getsaveEvent/${user.userId}`
    const response = await api.get(API_URL)
    let mapped = response.data.find.map((ele) => ele.EventID)
    setsavedEvent(mapped)
  }
  //save event
  const saveEvent = async (Eid) => {
    if (savedEvent.includes(Eid)) {
      //delete job
      try {
        const API_URL = `candidate/delsaveEvent/${Eid}`
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
          EventID: Eid,
        })
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        toast.error('error', { theme: 'dark' })
      }
    }
    getSavedEvents()
  }
  //get all event postings
  const getAllEvents = async () => {
    const API_URL = `candidate/getAllEvents?page=${pageNo}`
    const response = await api.get(API_URL, {})
    //setEvents(response.data.events)
    setEvents(
      response.data.events.filter(
        (data) =>
          data.eventTitle.toLowerCase().includes(keyword.toLowerCase()) &&
          data.company.name.toLowerCase().includes(location.toLowerCase())
      )
    )
    setTotPages(response.data.totalPages)
    setSearch(0)
  }
  //onclcik event
  const onClickApply = async (event) => {
    dispatch(applyEvent({ state: true, viewData: event }))
    navigate('/candidate/view-event')
  }

  useEffect(() => {
    setLoading(true)
    const getAll = async () => {
      await getAllEvents()
      if (user) {
        await getSavedEvents()
      }
      setLoading(false)
    }
    getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, search])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className='text-sm italic'>
            {events.length === 0 && <>No Results found</>}{' '}
          </p>
          <div className='grid grid-cols-2 gap-4'>
            {events.map((event) => (
              <div key={event._id} className='flex flex-col pt-4 ...'>
                <div className=' h-56 w-full bg-gray-50 rounded-lg  shadow-md'>
                  <div className=' h-5/6 w-full pl-4 pt-4 bg-white rounded-t-lg '>
                    <div className='flex justify-end pr-6'>
                      <div className=''>
                        <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-200 text-blue-800'>
                          {event.deliveryType}
                        </span>
                      </div>
                      {/* arrow to apply */}
                      <button
                        onClick={(e) => {
                          onClickApply(event)
                        }}
                      >
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
                        <div className='flex pt-4'>
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
                              d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                            />
                          </svg>
                          {event.company.name}
                        </div>
                        <div className='flex '>
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
                        {user === null && (
                          <button
                            onClick={saveEvent}
                            title='login to save'
                            disabled={true}
                            className='cursor-not-allowed'
                          >
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
                                d='M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5'
                              />
                            </svg>
                          </button>
                        )}
                        {user !== null && (
                          <button
                            onClick={(e) => {
                              saveEvent(event._id)
                            }}
                            title='login to save'
                          >
                            {!savedEvent.includes(event._id) && (
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
                                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                                />
                              </svg>
                            )}
                            {savedEvent.includes(event._id) && (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='w-6 h-6'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center pt-6'>
            <button
              className='text-blue-700 hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none !ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-blue-500'
              onClick={prev}
            >
              Previous
            </button>
            {pages.map((pageindex) => (
              <button
                key={pageindex}
                className='text-blue-700 hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none !ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-blue-500'
                onClick={() => setPageNo(pageindex)}
              >
                {pageindex + 1}
              </button>
            ))}
            <button
              onClick={next}
              className='text-blue-700 hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none !ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-blue-500'
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default EventsCards
