import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:4000/api' })
export const signup = (payload) => API.post('/signup', payload)
export const login = (payload) => API.post('/login', payload)
export default API
