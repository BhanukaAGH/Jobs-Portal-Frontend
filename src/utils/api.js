import axios from 'axios'

// axios
const api = axios.create({
  baseURL: '/api/v1',
})

// request
api.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
      'token'
    )}`
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
    // console.log(error.response)
    if (error.response.status === 401) {
      //   logoutUser()
    }
    return Promise.reject(error)
  }
)

export default api
