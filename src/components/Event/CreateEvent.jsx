import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../utils/api'

const CreateEvent = ({
  setForm,
  editEvent,
  event,
  setEvent,
  setLoading,
  setEditEvent,
}) => {
  useEffect(() => {
    if (editEvent) {
      setEvent(event)
      // setEvent({ ...event, date: event.date.toISOString().slice(0, 10) })
    }
    console.log(event)
  }, [])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEvent = {
      eventTitle: event.eventTitle,
      eventCategory: event.eventCategory,
      deliveryType: event.deliveryType,
      location: event.location,
      date: event.date,
      description: event.description,
    }

    const updateEvent = async () => {
      await api.patch(`/event/${event._id}`, newEvent)
      toast('Event Successfully updated', { type: 'success' })
    }

    const createEvent = async () => {
      await api.post('/event', newEvent)
      toast('Event Successfully created', { type: 'success' })
    }

    if (
      newEvent.eventTitle === '' ||
      newEvent.eventCategory === '' ||
      newEvent.deliveryType === '' ||
      newEvent.location === '' ||
      newEvent.date === undefined ||
      newEvent.description === ''
    ) {
      toast.error('Please fill all fields', { theme: 'dark' })
    } else {
      if (editEvent) {
        updateEvent()
      } else {
        createEvent()
      }
      setLoading(true)
      setForm(false)
      setEditEvent(false)
      setEvent({
        eventTitle: '',
        eventCategory: '',
        deliveryType: 'Virtual',
        location: '',
        date: undefined,
        description: '',
      })
    }
  }

  return (
    <div className=' w-full h-full px-3 md:px-6 py-6 overflow-auto scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
      <div className='col-span-12 lg:col-span-9 w-full h-full'>
        <form
          id='company-form'
          className='grid grid-cols-6 gap-3 pr-12'
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className='col-span-6 lg:col-span-3'>
            <label
              htmlFor='eventTitle'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Event Title
            </label>
            <input
              type='text'
              name='eventTitle'
              value={event.eventTitle}
              onChange={handleChange}
              placeholder='Event Title'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div className='col-span-6 lg:col-span-3'>
            <label
              htmlFor='date'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Date
            </label>
            <input
              type='date'
              name='date'
              value={event.date?.substr(0, 10)}
              onChange={handleChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='location'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Location
            </label>
            <input
              type='text'
              name='location'
              value={event.location}
              onChange={handleChange}
              placeholder='Location'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div className='col-span-6 lg:col-span-3'>
            <label
              htmlFor='eventCategory'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Event Category
            </label>
            <input
              type='text'
              name='eventCategory'
              value={event.eventCategory}
              onChange={handleChange}
              placeholder='Event Category'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div className='col-span-6 lg:col-span-3'>
            <label
              htmlFor='deliveryType'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Delivery Type
            </label>
            <select
              name='deliveryType'
              onChange={handleChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            >
              <option value='Virtual'>Virtual</option>
              <option value='Physical'>Physical</option>
            </select>
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='description'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Description
            </label>
            <textarea
              name='description'
              value={event.description}
              onChange={handleChange}
              placeholder='Description'
              rows='3'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>
          <div className='pl-80 pt-6'>
            <button
              type='submit'
              className=' mr-2 mb-2 rounded-lg bg-[rgb(0,0,0)]  px-5 py-2.5 text-sm font-medium text-white focus:outline-none'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
