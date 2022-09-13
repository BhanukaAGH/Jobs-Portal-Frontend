import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleNav: false,
  authModal: false,
  jobView: { state: false, viewData: null },
  jobEdit: { state: false, editData: null },
  jobApply: { state: false, viewData: null },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNavbar: (state, action) => {
      state.toggleNav = action.payload || !state.toggleNav
    },
    openAuth: (state, action) => {
      state.authModal = action.payload
    },
    viewJob: (state, action) => {
      state.jobView = action.payload
    },
    editJob: (state, action) => {
      state.jobEdit = action.payload
    },
    applyJob: (state, action) => {
      state.jobApply = action.payload
    },
  },
})

export const { toggleNavbar, openAuth, viewJob, editJob ,applyJob} = uiSlice.actions
export default uiSlice.reducer
