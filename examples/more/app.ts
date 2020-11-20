import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'
import axios, { AxiosRequestConfig, AxiosResponse } from '../../src/index'

axios({
  method: 'post',
  url: '/more/csrf',
  xsrfCookieName: 'X-Token-Cookie-DengQing',
  xsrfHeaderName: 'x-xsrf-token',
  params: {
    a: 1,
    b: [1, 2, 3]
  }
}).then(res => {
  console.log('csrf', res)
})

axios({
  method: 'post',
  url: '/more/csrf',
  xsrfCookieName: 'X-Token-Cookie-DengQing',
  xsrfHeaderName: 'x-xsrf-token',
  withCredentials: true,
  params: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { b: 1, d: 2, c: [1, 2, 3]}
  },
}).then(res => {
  console.log('csrf', res)
})

axios({
  url: '/more/validate-status',
  method: 'get',
  auth: {
    username: 'dengqing',
    password: '123456'
  },
  validateStatus(status) {
    return status !== 200
  }
}).catch(err => {
  console.log(err, 'validate status')
})

axios({
  url: '/more/serializer',
  method: 'get',
  params: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { b: 1, d: 2, c: [1, 2, 3]}
  },
  validateStatus(status) {
    return status !== 200
  }
}).catch(err => {
  console.log(err, 'validate status')
})

axios({
  url: '/more/serializer',
  method: 'get',
  params: new URLSearchParams([['a', 'b'], ['b', 'c'], ['d', 'e']]),
  validateStatus(status) {
    return status !== 200
  }
}).catch(err => {
  console.log(err, 'validate status')
})

axios({
  url: '/more/serializer',
  method: 'get',
  params: {
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: { a: 1, b: 2, c: [1, 2, 3] }
  },
  paramsSerialize: (params) => {
    return qs.stringify(params)
  },
  validateStatus(status) {
    return status !== 200
  }
}).catch(err => {
  console.log(err, 'validate status')
})


function calculationProgress(e: ProgressEvent) {
  const { loaded, total } = e
  return loaded / total
}

const instance = axios.create({
  timeout: 0,
  baseURL: 'http://127.0.0.1:8088',
  onDownloadProgress(e) {
    nprogress.set(calculationProgress(e))
  },
  onUploadProgress(e) {
    nprogress.set(calculationProgress(e))
  }
})

console.log(instance)

instance.interceptors.request.use((config: any) => {
  nprogress.start()
  return config
})
instance.interceptors.response.use((response: AxiosResponse) => {
  nprogress.done()
  return response
})

console.log(Object.keys(axios), 'get')
console.log(Object.keys(instance), 'get')

function html() {
  document.getElementById('download').addEventListener('click', e => {
    // instance.get('http://vd3.bdstatic.com/mda-hmnip504thyiae1e/mda-hmnip504thyiae1e.mp4?playlist=%5B%22hd%22%5D', {
    //   timeout: 0,
    //   headers: {
    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //   },
    // })
    // instance.get('https://seopic.699pic.com/photo/50061/6127.jpg_wh1200.jpg', {
    //   withCredentials: true,
    //   timeout: 0,
    //   headers: {
    //     'origin': 'http://vd3.bdstatic.com/',
    //     'referer': 'http://vd3.bdstatic.com/',
    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //   },
    // })
    instance.get('http://127.0.0.1:8080/uploads/915e458d9692bf3177c79027f40571a0', {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'text/event-stream'
      }
    })
  })

  document.getElementById('upload').addEventListener('click', e => {
    const formData = new FormData()
    const file = document.getElementById('file') as HTMLInputElement
    if (file) {
      console.log(file.files)
      formData.append('file', file.files[0], file.name)
      instance
        .post('/more/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          console.log(res, 'upload sus')
        })
        .catch(err => {
          console.log(err, 'upload err')
        })
    }
  })
}
html()


console.log('all spread getUri')

const bestAxios = new axios.Axios({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 4000,
})

bestAxios.interceptors.request.use(function(config) {
  nprogress.start()
  return config
})

bestAxios.interceptors.response.use(function(response) {
  nprogress.done()
  return response
})

const config: AxiosRequestConfig = {
  url: '/more/serializer',
  method: 'post',
  auth: {
    username: 'admin',
    password: '123456'
  },
  data: qs.stringify({
    a: [1, 2, 3, 5],
    b: { a: 1, b: 2 }
  }),
}

function p1() {
  return bestAxios.request(config)
}
function p2() {
  return bestAxios.request(config)
}
function p3() {
  return bestAxios.request(config)
}

axios.all([p1(), p2(), p3()]).then(axios.spread(function (r1, r2, r3) {
  console.log('r1, r2, r3: ', r1, r2, r3);
}))

axios.all([p1(), p2(), p3()]).then(([r11, r22, r33]) => {
  console.log('r11, r22, r33: ', r11, r22, r33);
})

const url = bestAxios.getUri(config)
console.log('getUri: ', url);
