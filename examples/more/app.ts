import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import axios, { AxiosResponse } from '../../src/index'

axios({
  method: 'post',
  url: '/more/csrf',
  xsrfCookieName: 'X-Token-Cookie-DengQing',
  xsrfHeaderName: 'x-xsrf-token',
  params: {
    a: 1,
    b: [1, 2, 3]
  }
}).then((res) => {
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
    b: [1, 2, 3]
  }
}).then((res) => {
  console.log('csrf', res)
})

axios({
  url: '/more/validate-status',
  method: 'get',
  validateStatus(status) {
    return status !== 200
  }
}).catch((err) => {
  console.log(err, 'validate status')
})


const instance = axios.create({
  timeout: 0,
  onDownloadProgress(e) {
    console.log(e, 'download')
  },
  onUploadProgress(e) {
    console.log(e, 'upload')
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

function html(){
  document.getElementById('download').addEventListener('click', (e) => {
    instance.get('http://vd3.bdstatic.com/mda-hmnip504thyiae1e/mda-hmnip504thyiae1e.mp4?playlist=%5B%22hd%22%5D', {
      timeout: 0,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      },
    })
    instance.get('https://seopic.699pic.com/photo/50061/6127.jpg_wh1200.jpg', {
      withCredentials: true,
      timeout: 0,
      headers: {
        'origin': 'http://vd3.bdstatic.com/',
        'referer': 'http://vd3.bdstatic.com/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      },
    })
    instance.get('http://localhost:8080/uploads/b5f364d01275d050b72cf15d97336609')
  })

  document.getElementById('upload').addEventListener('click', (e) => {
    const formData = new FormData()
    const file = document.getElementById('file') as HTMLInputElement
    if (file) {
      console.log(file.files)
      formData.append('file', file.files[0], file.name)
      instance.post('/more/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        console.log(res, 'upload')
      }).catch((err) => {
        console.log(err, 'upload err')
      })
    }
  })
}
html()

