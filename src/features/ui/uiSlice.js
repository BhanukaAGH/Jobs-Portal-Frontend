import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleNav: false,
  authModal: false,
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
  },
})

export const { toggleNavbar, openAuth } = uiSlice.actions
export default uiSlice.reducer
