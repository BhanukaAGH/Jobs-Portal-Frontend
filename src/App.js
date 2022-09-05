import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import CompanySignUp from './pages/CompanySignUp'
import PostJob from './pages/PostJob'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Companies from './pages/Companies'
import Events from './pages/Events'
import Aboutus from './pages/Aboutus'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/company/sign-up' element={<CompanySignUp />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/events' element={<Events />} />
        <Route path='/about' element={<Aboutus />} />
        <Route
          path='/company/post-job'
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/company/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user-profile'
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        closeOnClick
        draggable
        limit={3}
      />
    </>
  )
}

export default App
