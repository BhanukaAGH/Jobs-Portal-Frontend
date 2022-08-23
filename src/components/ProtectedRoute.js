import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openAuth } from '../features/ui/uiSlice'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    if (
      location.pathname === '/company/dashboard' ||
      location.pathname === '/company/post-job'
    ) {
      return (
        <Navigate
          to={'/company/sign-up'}
          replace
          state={{ path: location.pathname }}
        />
      )
    }

    dispatch(openAuth(true))
    return <Navigate to={'/'} replace state={{ path: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
