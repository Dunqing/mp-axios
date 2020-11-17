// import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from '../../src/index'

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
  onDownloadProgress(e) {
    console.log(e, 'download')
  },
  onUploadProgress(e) {
    console.log(e, 'upload')
  }
})


console.log(Object.keys(axios), 'get')
console.log(Object.keys(instance), 'get')

function html(){
  document.getElementById('download').addEventListener('click', (e) => {
    instance.get('http://vd3.bdstatic.com/mda-hmnip504thyiae1e/mda-hmnip504thyiae1e.mp4?playlist=%5B%22hd%22%5D')
  })

  document.getElementById('upload').addEventListener('click', (e) => {
    const formData = new FormData()
    const file = document.getElementById('file') as HTMLInputElement
    if (file) {
      formData.append('file', file.files[0])
      instance.post('/more/upload', formData).then((res) => {
        console.log(res, 'upload')
      }).catch((err) => {
        console.log(err, 'upload err')
      })
    }
  })
}
html()

