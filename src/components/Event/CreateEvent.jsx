import React, { useState } from 'react'
import axios from 'axios'
import api from '../../utils/api'

const CreateEvent = ({ setForm }) => {
  const [event, setEvent] = useState({
    eventTitle: '',
    deliveryType: 'Virtual',
    location: '',
    date: '',
    description: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEvent = {
      eventTitle: event.eventTitle,
      deliveryType: event.deliveryType,
      location: event.location,
      date: event.date,
      description: event.description,
    }

    const createEvent = async () => {
      const res = await api.post('/event', newEvent)
      setEvent(res.data)
    }

    createEvent()

    setForm(false)
  }

  return (
    <div className='grid grid-cols-12 w-full h-full px-3 md:px-6 py-6 overflow-auto scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
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

          {/* <div className='col-span-6 lg:col-span-3'>
            <label
              htmlFor='date'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Date
            </label>
            <input
              type='text'
              name='date'
              value={event.date}
              onChange={handleChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div> */}

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

          {/* <div className='col-span-6'>
            <label
              htmlFor='deliveryType'
              className='block text-sm font-medium text-gray-700'
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
          </div> */}

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
          <div className='flex justify-center'>
            <button
              type='submit'
              className=' mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
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
