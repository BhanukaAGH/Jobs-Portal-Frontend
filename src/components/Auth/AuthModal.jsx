import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useDispatch } from 'react-redux'
import { openAuth } from '../../features/ui/uiSlice'
import Login from './Login'
import Register from './Register'
import { motion } from 'framer-motion'

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
}

const AuthModal = () => {
  const [openLogin, setOpenLogin] = useState(true)
  const dispatch = useDispatch()

  return (
    <div className='fixed inset-0 z-40 min-w-full !overflow-hidden'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        <div className='absolute inset-0 bg-[#F6F4F4] bg-opacity-70 transition-opacity'></div>
        <motion.div
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          className='w-full transform overflow-hidden rounded-lg z-[1] bg-white shadow-xl transition-all sm:max-w-lg'
        >
          <OutsideClickHandler onOutsideClick={() => dispatch(openAuth(false))}>
            {openLogin && <Login setOpenLogin={setOpenLogin} />}
            {!openLogin && <Register setOpenLogin={setOpenLogin} />}
          </OutsideClickHandler>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthModal
