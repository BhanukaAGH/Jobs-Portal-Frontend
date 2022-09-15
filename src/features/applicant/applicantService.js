import api from '../../utils/api'

const API_URL = '/applicant'

//! GET ALL JOB APPLICANTS
const getAllJobApplicants = async ({ companyId, jobId }) => {
  const response = await api.get(`${API_URL}/${companyId}/${jobId}`)
  return response.data
}

//! UPDATE JOB APPLICANT STATUS
const updateApplicantStatus = async ({ appliedJobId, applicantStatus }) => {
  const response = await api.patch(`${API_URL}/${appliedJobId}`, {
    applicantStatus,
  })
  return response.data
}

const applicantService = {
  getAllJobApplicants,
  updateApplicantStatus,
}

export default applicantService
