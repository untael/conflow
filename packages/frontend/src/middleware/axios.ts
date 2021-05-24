import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import qs from 'qs'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
})

const apiExecuteRequest = axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config
  return config
}, (error) => {
  return Promise.reject(error)
})

const apiExecuteResponse = axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export const executeApiRequest = async (requestConfig: AxiosRequestConfig) => {
  try {
    return (await axiosInstance({ ...requestConfig })).data
  } catch (e) {
    throw e.response && e.response.data ? e.response.data : e
  }
}

export default {
  axiosInstance,
}
