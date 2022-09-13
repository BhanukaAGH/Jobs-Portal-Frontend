import { createSlice } from '@reduxjs/toolkit'

const jobViewState = JSON.parse(localStorage.getItem('viewJob'))
const jobEditState = JSON.parse(localStorage.getItem('editJob'))
const jobApplyState = JSON.parse(localStorage.getItem('applyJob'))

const initialState = {
  toggleNav: false,
  authModal: false,
  jobView: {
    state: jobViewState ? jobViewState.state : false,
    viewData: jobViewState ? jobViewState.viewData : null,
  },
  jobEdit: {
    state: jobEditState ? jobEditState.state : false,
    editData: jobEditState ? jobEditState.editData : null,
  },
  jobApply: {
    state: jobApplyState ? jobApplyState.state : false,
    viewData: jobApplyState ? jobApplyState.viewData : null,
  },
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
      if (action.payload?.state) {
        localStorage.setItem('applyJob', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('applyJob')
      }
      state.jobApply = action.payload
    },
  },
})

export const { toggleNavbar, openAuth, viewJob, editJob ,applyJob} = uiSlice.actions
export default uiSlice.reducer
