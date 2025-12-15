import axios from 'axios'
import { tokenService } from '../services/tokenService.js'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = tokenService.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default api
