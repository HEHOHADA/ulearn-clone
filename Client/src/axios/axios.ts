import axios from 'axios'
import store from '../store/store'


axios.create({baseURL: 'http://localhost:5001/'})
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${ store.getState().auth.token }`
    return config
})
export default axios
