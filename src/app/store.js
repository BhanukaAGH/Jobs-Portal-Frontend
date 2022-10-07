import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import authReducer from '../features/auth/authSlice'
import companyReducer from '../features/company/companySlice'
import jobReducer from '../features/job/jobSlice'
import applicantReducer from '../features/applicant/applicantSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    company: companyReducer,
    job: jobReducer,
    applicant: applicantReducer,
  },
})
