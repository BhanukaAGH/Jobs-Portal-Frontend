import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleNav: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNavbar: (state, action) => {
      state.toggleNav = action.payload || !state.toggleNav
    },
  },
})

export const { toggleNavbar } = uiSlice.actions
export default uiSlice.reducer
