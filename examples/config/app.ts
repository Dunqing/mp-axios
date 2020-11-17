import qs from 'qs';
import Axios from '../../src/index';

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function custom(data, headers) {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return qs.stringify(data)
      }else {
        return JSON.stringify(data)
      }
    }
  ],
  transformResponse: [
    function custom(data) {
      console.log('data: ', data);
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      data.transform = true
      return data
    }
  ]
})

axios.defaults.headers.common = {
  token: new Date().toISOString()
}

axios({
  method: 'post',
  url: '/config/post',
  headers: {
    test: 1
  },
  data: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { a: 1, b: 2, c: [1, 2, 3] }
  }
})

axios({
  method: 'post',
  url: '/config/post',
  data: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { a: 1, b: 2, c: [1, 2, 3] }
  }
})

axios({
  method: 'post',
  url: '/config/post',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { a: 1, b: 2, c: [1, 2, 3] }
  }
}).then(res => {
  console.log('res', res)
})
