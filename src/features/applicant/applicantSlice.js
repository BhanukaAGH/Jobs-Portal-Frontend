import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import applicantService from './applicantService'

const initialState = {
  updateApplicant: null,
  applicants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//! GET ALL JOB APPLICANTS
export const getAllJobApplicants = createAsyncThunk(
  'applicant/getAllJobApplicants',
  async (data, thunkAPI) => {
    try {
      return await applicantService.getAllJobApplicants(data)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! UPDATE JOB APPLICANT STATUS
export const updateApplicantStatus = createAsyncThunk(
  'applicant/updateApplicantStatus',
  async (data, thunkAPI) => {
    try {
      return await applicantService.updateApplicantStatus(data)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    applicantUpdate: (state, action) => {
      state.updateApplicant = action.payload
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllJobApplicants.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobApplicants.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicants = action.payload.applicants
      })
      .addCase(getAllJobApplicants.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateApplicantStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateApplicantStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.updateApplicant = action.payload
      })
      .addCase(updateApplicantStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, applicantUpdate } = applicantSlice.actions
export default applicantSlice.reducer
