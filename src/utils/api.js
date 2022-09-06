import axios from 'axios'
import { logout } from '../features/auth/authSlice'

let store
export const injectStore = (_store) => {
  store = _store
}

// axios
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
})

// request
api.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${
      JSON.parse(localStorage.getItem('user'))?.token
    }`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default api
