import { createSlice } from '@reduxjs/toolkit'

const jobViewState = JSON.parse(localStorage.getItem('viewJob'))
const jobEditState = JSON.parse(localStorage.getItem('editJob'))

const initialState = {
  toggleNav: false,
  authModal: false,
  jobView: { state: false, viewData: null },
  jobEdit: { state: false, editData: null },
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
      if (action.payload?.state) {
        localStorage.setItem('viewJob', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('viewJob')
      }
      state.jobView = action.payload
    },
    editJob: (state, action) => {
      if (action.payload?.state) {
        localStorage.setItem('editJob', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('editJob')
      }
      state.jobEdit = action.payload
    },
    applyJob: (state, action) => {
      state.jobApply = action.payload
    },
  },
})

export const { toggleNavbar, openAuth, viewJob, editJob ,applyJob} = uiSlice.actions
export default uiSlice.reducer
