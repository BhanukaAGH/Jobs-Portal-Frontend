import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import CompanySignUp from './pages/CompanySignUp'
import PostJob from './pages/PostJob'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/company/sign-up' element={<CompanySignUp />} />
        <Route path='/company/post-job' element={<PostJob />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
