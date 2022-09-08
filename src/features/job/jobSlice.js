import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jobService from './jobService'

const initialState = {
  job: null,
  jobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//! Create Job
export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, thunkAPI) => {
    try {
      return await jobService.createJob(jobData)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Get Job
export const getJob = createAsyncThunk(
  'job/getJob',
  async (jobId, thunkAPI) => {
    try {
      return await jobService.getJob(jobId)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Get All Job
export const getAllJobs = createAsyncThunk(
  'job/getAllJob',
  async (thunkAPI) => {
    try {
      return await jobService.getAllJob()
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Update Job
export const updateJob = createAsyncThunk(
  'job/updateJob',
  async (jobData, thunkAPI) => {
    try {
      return await jobService.updateJob(jobData)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Delete Job
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    try {
      return await jobService.deleteJob(jobId)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.job = action.payload
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.job = action.payload
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload.jobs
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.job = action.payload
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = jobSlice.actions
export default jobSlice.reducer
