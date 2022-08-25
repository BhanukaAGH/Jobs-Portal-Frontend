import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserToken } from '../auth/authSlice'
import companyService from './companyService'

const initialState = {
  company: null,
  companies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//! Get Company
export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (companyId, thunkAPI) => {
    try {
      return await companyService.getCompany(companyId)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Get All Company
export const getAllCompany = createAsyncThunk(
  'company/getAllCompany',
  async (thunkAPI) => {
    try {
      return await companyService.getAllCompany()
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! Update Company
export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (companyData, thunkAPI) => {
    try {
      const response = await companyService.updateCompany(companyData)
      localStorage.setItem('user', JSON.stringify(response))
      thunkAPI.dispatch(updateUserToken(response))
      return response
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const companySlice = createSlice({
  name: 'company',
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
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.company = action.payload
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.companies = action.payload.companies
      })
      .addCase(getAllCompany.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = companySlice.actions
export default companySlice.reducer
