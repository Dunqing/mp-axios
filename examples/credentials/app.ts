import axios from '../../src/index'

document.cookie = 'a=b'

axios({
  method: 'get',
  url: '/credentials/get',
  params: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'POST',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'http://127.0.0.1:8088/credentials/cors',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'POST',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'http://127.0.0.1:8088/credentials/cors',
  data: {
    a: 1,
    b: 2
  }
})
