import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const UpdateStatus = ({ updateView, updateStatus }) => {
  const [status, setStatus] = useState('Verified')
  const closeStatus = () => {
    updateView()
  }

  const updateStatusValue = () => {
    if (status === 'Verified') {
      updateStatus(true)
      return
    }
    updateStatus(false)
  }
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black  bg-opacity-50 '>
      <div className='rounded-lg bg-white py-4 px-6 border-1  border-black w-1/2'>
        <div className='flex items-center justify-between border-b-4 border-green-500 pb-5'>
          <h2>Update Company Status</h2>
          <AiOutlineClose onClick={closeStatus} className='text-red-600' />
        </div>
        <div className='mt-5 flex justify-center items-center'>
          <label htmlFor='' className='mr-4 text-lg'>
            Status
          </label>
          <select
            name='status'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='Verified'>Verified</option>
            <option value='Not Verified'>Not Verified</option>
          </select>
        </div>
        <div className='flex justify-center mt-5'>
          <button
            className='admin-btn bg-green-600'
            onClick={updateStatusValue}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateStatus
