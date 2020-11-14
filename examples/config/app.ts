import qs from 'qs';
import Axios from '../../src/index';

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    function custom(data, headers) {
      console.log('data, headers: ', data, headers);
      if (typeof data === 'object') {
        data.transform = true
      } else if (headers['Content-Type'].indexOf('x-www-form-urlencoded') !== -1) {
        data = qs.stringify(JSON.parse(data));
      }
      return data
    }
  ],
  transformResponse: [
    function custom(data) {
      data.transform = true
      return data
    }
  ]
})

axios.defaults.headers.common = {
  token: new Date().toISOString()
}

// axios.defaults.transformRequest = [
//   function custom(data, headers) {
//     console.log(data)
//     data.transform = true
//     return data
//   }
// ],

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
}).then((res) => {
  console.log('res', res)
})
