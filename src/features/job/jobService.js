import api from '../../utils/api'

const API_URL = '/job'

//! CREATE JOB
const createJob = async (data) => {
  const response = await api.post(API_URL, data)
  return response.data
}

//! GET JOB
const getJob = async (jobId) => {
  const response = await api.get(API_URL + `/${jobId}`)
  return response.data
}

//! GET ALL JOB
const getAllJob = async () => {
  const response = await api.get(API_URL)
  return response.data
}

//! UPDATE JOB
const updateJob = async ({ jobId, jobData }) => {
  const response = await api.patch(API_URL + `/${jobId}`, jobData)
  return response.data
}

//! DELETE JOB
const deleteJob = async (jobId) => {
  const response = await api.delete(API_URL + `/${jobId}`)
  return response.data
}

const jobService = {
  createJob,
  getJob,
  getAllJob,
  updateJob,
  deleteJob,
}

export default jobService
