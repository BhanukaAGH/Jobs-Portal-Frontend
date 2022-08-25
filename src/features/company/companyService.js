import api from '../../utils/api'

const API_URL = '/company'

//! Get Company
const getCompany = async (companyId) => {
  const response = await api.get(API_URL + `/${companyId}`)
  return response.data
}

//! Get All Company
const getAllCompany = async () => {
  const response = await api.get(API_URL)
  return response.data
}

//! Update Company
const updateCompany = async (companyData) => {
  const response = await api.patch(API_URL + `/${companyData.id}`, companyData)
  return response.data
}

const companyService = {
  getCompany,
  getAllCompany,
  updateCompany,
}

export default companyService
