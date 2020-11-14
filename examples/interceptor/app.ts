import axios from '../../src/axios'

axios.interceptors.request.use((config) => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use((response) => {
  response.data.data.test2 = 2
  return response
})
const interceptors = axios.interceptors.response.use((response) => {
  response.data.data.test3 = 3
  return response
})
axios.interceptors.response.use((response) => {
  response.data.data.test4 = 4
  return response
})

axios.interceptors.response.eject(interceptors)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  },
  params: {
    test: 0
  }
}).then((res) => {
  console.log(res.data)
})
