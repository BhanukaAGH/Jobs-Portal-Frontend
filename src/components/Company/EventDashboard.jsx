import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import jsPDF from 'jspdf'

import { MdOutlineEdit, MdDeleteOutline, MdSearch } from 'react-icons/md'
import api from '../../utils/api'
import CreateEvent from '../Event/CreateEvent'

const EventDashboard = () => {
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({
    eventTitle: '',
    eventCategory: '',
    deliveryType: 'Virtual',
    location: '',
    date: undefined,
    description: '',
  })
  const [editEvent, setEditEvent] = useState(false)
  const [form, setForm] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllEvents = async () => {
      const res = await api.get('/event/eventsByCompanyId')
      setEvents(res.data)
    }

    getAllEvents()
    setLoading(false)
  }, [loading, setLoading])

  useEffect(() => {
    if (searchInput === '') {
      setResults(events)
    } else {
      let results = events.filter(
        (event) =>
          event.eventTitle.toLowerCase().includes(searchInput) ||
          event.deliveryType.toLowerCase().includes(searchInput) ||
          event.location.toLowerCase().includes(searchInput)
      )
      setResults(results)
    }
  }, [searchInput, events])

  const handleEditEvent = (eventData) => {
    setEvent(eventData)
    setForm(true)
    setEditEvent(true)
  }

  const handleDeleteEvent = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this event data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`/event/${id}`)
        toast('Event Delete  Successfully', { type: 'success' })
        setLoading(true)
      }
    })
  }

  const generateReport = () => {
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'portrait' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = 'Event Report Of the company'
    const headers = [['Title', 'Location', 'Delivrey Type', 'Date']]

    const data = results.map((event) => [
      event.eventTitle,
      event.location,
      event.deliveryType,
      event.date.substr(0, 10),
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('event report.pdf')
  }

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Company Events List</h3>
        <div className='space-x-3'>
          <button
            className='dashbord-title-button bg-white text-black border border-black hidden md:inline-block'
            onClick={generateReport}
          >
            Event Report
          </button>
          <button
            className='dashbord-title-button'
            onClick={() => setForm(!form)}
          >
            Create New Event
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className='dashboard-content'>
        {form ? (
          <CreateEvent
            setForm={setForm}
            editEvent={editEvent}
            event={event}
            setEvent={setEvent}
            setLoading={setLoading}
            setEditEvent={setEditEvent}
          />
        ) : (
          <div className='flex flex-1 overflow-hidden relative h-full w-full'>
            <div className='absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
              <div className='flex flex-col items-start space-y-2 pt-3 pb-2 px-4'>
                <button className='dashbord-title-button bg-white text-black border border-black block md:hidden'>
                  Event Report
                </button>
                <div className='relative'>
                  <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <MdSearch className='w-5 h-5 text-gray-500' />
                  </div>
                  <input
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='block p-2 pl-10 w-72 md:w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Search for events'
                  />
                </div>
              </div>

              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      Title
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Location
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Delivery Type
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Date
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((eventData) => (
                    <tr
                      key={eventData._id}
                      className='bg-white border-b hover:bg-gray-50'
                    >
                      <td className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                        {eventData.eventTitle}
                      </td>
                      <td className='py-4 px-6'>{eventData.location}</td>
                      <td className='py-4 px-6'>{eventData.deliveryType}</td>
                      <td className='py-4 px-6'>
                        {eventData.date.substr(0, 10)}
                      </td>
                      <td className='flex items-center py-4 px-6 space-x-3'>
                        <MdOutlineEdit
                          className='text-lg text-blue-500 cursor-pointer'
                          onClick={() => handleEditEvent(eventData)}
                        />
                        <MdDeleteOutline
                          className='text-lg text-red-500 cursor-pointer'
                          onClick={() => handleDeleteEvent(eventData._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDashboard
