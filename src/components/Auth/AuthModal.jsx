import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useDispatch } from 'react-redux'
import { openAuth } from '../../features/ui/uiSlice'
import Login from './Login'
import Register from './Register'

const AuthModal = () => {
  const [openLogin, setOpenLogin] = useState(true)
  const dispatch = useDispatch()

  return (
    <div className='fixed inset-0 z-40 min-w-full !overflow-hidden'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        <div className='absolute inset-0 bg-[#F6F4F4] bg-opacity-70 transition-opacity'></div>
        <div className='w-full transform overflow-hidden rounded-lg  bg-white shadow-xl transition-all sm:max-w-lg'>
          <OutsideClickHandler onOutsideClick={() => dispatch(openAuth(false))}>
            {openLogin && <Login setOpenLogin={setOpenLogin} />}
            {!openLogin && <Register setOpenLogin={setOpenLogin} />}
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
