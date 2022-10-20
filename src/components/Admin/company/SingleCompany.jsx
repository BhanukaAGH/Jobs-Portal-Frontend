import React from 'react'
import { BiMapPin, BiGlobe } from 'react-icons/bi'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import api from '../../../utils/api'

const SingleCompany = ({
  showView,
  updateView,
  _id: userId,
  name,
  email,
  photoUrl,
  _company,
}) => {
  const { _id, companyLocation, verified, companyDescription } = _company
  const displayView = () => {
    const data = { name, email, photoUrl, companyLocation, companyDescription }
    showView(data)
  }
  const updateCompany = (id) => {
    updateView(id)
  }

  const deleCompany = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover  Company Details!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`admin/delete/company/${userId}`)
        toast('Account Delete  Successfully', { type: 'success' })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    })
  }
  return (
    <article className='p-6 border-2  border-black rounded-lg w-1/4 mx-3 mb-3'>
      <div className='flex justify-end bt-2'>
        <button className='admin-btn bg-black' onClick={displayView}>
          More Info
        </button>
      </div>
      <div className='flex justify-between  items-center'>
        <img src={photoUrl} alt='' className='h-16' />
        <p className='text-lg font-bold text-gray-900'>{name}</p>
      </div>
      <div className='flex justify-start  items-center mt-4'>
        <BiMapPin className='h-10 w-10 mr-5' />
        <p className='text-sm font-bold  text-gray-900'>{companyLocation}</p>
      </div>
      <div className='flex justify-start  items-center mt-4'>
        <BiGlobe className='h-10 w-10 mr-5' />
        <p className='text-sm font-bold  text-gray-900'>{email}</p>
      </div>
      <div className='flex justify-start  items-center mt-4'>
        <p className='mr-5'>Status</p>
        <p className='text-sm font-bold  text-gray-900'>
          {verified ? 'Verified' : 'Not verified'}
        </p>
      </div>
      <div className='flex justify-between  items-center mt-4'>
        <button
          className='admin-btn bg-green-600 '
          onClick={() => updateCompany(_id)}
        >
          Update
        </button>
        <button className='admin-btn bg-red-600 ' onClick={deleCompany}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default SingleCompany
