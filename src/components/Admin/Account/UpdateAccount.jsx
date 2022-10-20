import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../../Loading'

const UpdateAccount = ({ closeModel, info }) => {
  const { _id, name, email, photoUrl } = info
  const [profile, setProfile] = useState(null)
  const [image, setImage] = useState(photoUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [nameInput, setNameInput] = useState(name)
  const [emailInput, setEmailInput] = useState(email)

  let url = photoUrl

  const closeUpdate = () => {
    closeModel()
  }

  const controlInput = (e) => {
    e.preventDefault()
  }

  const handleName = (e) => {
    setNameInput(e.target.value)
  }

  const handleEmail = (e) => {
    setEmailInput(e.target.value)
  }

  const profileUpload = (e) => {
    const file = e.target.files[0]
    if (file?.size >= 2000000) {
      toast('File Size is too large', { type: 'error' })
      return
    }
    setProfile(file)
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', profile)
    data.append('upload_preset', 'jobs.lk')

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/aghb/image/upload',
        data
      )

      return uploadRes?.data?.secure_url
    } catch (error) {
      console.log(error)
    }
  }

  const Submit = async () => {
    if (profile) {
      url = await uploadImage()
    }
    let data = {
      name: nameInput,
      email: emailInput,
    }
    data.photoUrl = url
    try {
      setIsLoading(true)
      await api.patch(`/admin/update/${_id}`, data)
      setIsLoading(false)
      toast('Account Updated  Successfully', { type: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 4000)
    } catch (error) {
      toast(error, { type: 'error' })
    }
  }

  if (isLoading) return <Loading />

  return (
    <article className='absolute inset-0 flex items-center justify-center bg-black  bg-opacity-50 '>
      <div className='rounded-lg bg-white py-4 px-6'>
        <div className='flex items-center justify-between border-b-4 border-green-500 pb-5'>
          <h2>Update Admin Account Details</h2>
          <AiOutlineClose onClick={closeUpdate} className='text-red-600' />
        </div>
        <div className='flex items-center'>
          <form onSubmit={controlInput} className='py-6 px-6'>
            <div>
              <label
                htmlFor='Subject'
                className='mb-2 block text-lg font-medium text-gray-700'
              >
                Name
              </label>
              <input
                type='text'
                name='name'
                className='w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg'
                defaultValue={name}
                onChange={handleName}
              />
            </div>
            <div>
              <label
                htmlFor='Subject'
                className='mb-2 block text-lg font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                className='w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg'
                defaultValue={email}
                onChange={handleEmail}
              />
            </div>

            <div className='mt-2'>
              <label
                htmlFor=' To'
                className='mb-2 block text-lg font-medium text-gray-700'
              >
                Profile Picture
              </label>
              <input
                type='file'
                name='Profile_Picture'
                accept='image/png,  image/jpeg'
                className='w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg'
                onChange={profileUpload}
              />
            </div>
            <div className='mt-3 flex justify-center'>
              <button
                type='submit'
                value='Send'
                className='admin-btn bg-green-600 text-center'
                onClick={Submit}
              >
                Update Account
              </button>
            </div>
          </form>
          <img src={image} alt='profileimage' height={200} width={200} />
        </div>
      </div>
    </article>
  )
}

export default UpdateAccount
