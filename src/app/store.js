import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import authReducer from '../features/auth/authSlice'
import companyReducer from '../features/company/companySlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    company: companyReducer,
  },
})
