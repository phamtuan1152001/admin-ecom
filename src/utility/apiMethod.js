import axios from 'axios'
import { BASE_URL_API_DEV } from '../config/api'

const apiMethod = axios.create({
  baseURL: BASE_URL_API_DEV,
})

apiMethod.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  }
)
apiMethod.interceptors.request.use(request => {
  return request
})

export default apiMethod
