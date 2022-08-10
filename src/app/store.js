import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
})
