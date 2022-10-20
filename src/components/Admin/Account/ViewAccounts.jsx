import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
} from 'react-icons/md'
import UpdateAccount from './UpdateAccount'
import swal from 'sweetalert'

const ViewAccounts = () => {
  const [details, setDetails] = useState([])
  const [modelOpen, setModelOpen] = useState(false)
  const [info, setInfo] = useState({})
  let selectId
  const getAllAccounts = async () => {
    const res = await api.get('/admin')
    const { accounts } = res.data
    setDetails(accounts)
  }

  const getAdmin = async () => {
    const res = await api.get(`/admin/${selectId}`)
    const { account } = res.data
    setInfo(account)
  }

  const update = async (id) => {
    selectId = id
    await getAdmin()
    setModelOpen(!modelOpen)
  }

  const closeModel = () => {
    setModelOpen(!modelOpen)
  }

  useEffect(() => {
    getAllAccounts()
  }, [])

  const deleteAccount = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`admin/delete/${id}`)
        toast('Account Delete  Successfully', { type: 'success' })
        setTimeout(() => {
          window.location.reload()
        }, 4000)
      }
    })
  }

  if (modelOpen) {
    return <UpdateAccount closeModel={closeModel} info={info} />
  }

  return (
    <table className='w-full text-sm text-left text-gray-500'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='py-3 px-6'>
            Name
          </th>
          <th scope='col' className='py-3 px-6'>
            Email
          </th>
          <th scope='col' className='py-3 px-6'>
            Profile Image
          </th>
          <th scope='col' className='py-3 px-6'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {details.map((data) => (
          <tr key={data._id} className='bg-white border-b hover:bg-gray-50'>
            <td className='py-4 px-6'>{data.name}</td>
            <td className='py-4 px-6'>{data.email}</td>
            <td className='py-4 px-6'>
              <img
                src={data.photoUrl}
                height={50}
                width={50}
                // className="rounded-full"
                alt='profile'
                style={{ borderRadius: 500 }}
              />
            </td>
            <td className='flex items-center py-6 px-6 space-x-3'>
              <MdOutlineRemoveRedEye className='text-lg cursor-pointer' />
              <MdOutlineEdit
                onClick={() => update(data._id)}
                className='text-lg text-blue-500 cursor-pointer'
              />
              <MdDeleteOutline
                onClick={() => deleteAccount(data._id)}
                className='text-lg text-red-500 cursor-pointer'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ViewAccounts
