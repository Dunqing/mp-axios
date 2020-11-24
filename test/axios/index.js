const axios = Axios.create({
  baseURL: 'http://127.0.0.1:8080'
})

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(response => {
  response.data.data.test2 = 2
  return response
})
const interceptors = axios.interceptors.response.use(response => {
  response.data.data.test3 = 3
  return response
})
axios.interceptors.response.use(response => {
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
}).then(res => {
  console.log(res.data)
})

const config = {
  url: '/more/serializer',
  method: 'post',
  auth: {
    username: 'admin',
    password: '123456'
  },
  data: {
    a: [1, 2, 3, 5],
    b: { a: 1, b: 2 }
  }
}

function p1() {
  return axios.request(config)
}
function p2() {
  return axios.request(config)
}
function p3() {
  return axios.request(config)
}

Axios.all([p1(), p2(), p3()]).then(
  Axios.spread(function(r1, r2, r3) {
    console.log('r1, r2, r3: ', r1, r2, r3)
  })
)

Axios.all([p1(), p2(), p3()]).then(([r11, r22, r33]) => {
  console.log('r11, r22, r33: ', r11, r22, r33)
})

const url = axios.getUri(config)
console.log('getUri: ', url)
