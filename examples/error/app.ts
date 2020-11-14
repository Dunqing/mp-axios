import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error'

axios({
  method: 'get',
  url: '/error/get',
  params: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res, '1')
  })
  .catch(err => {
    console.log(err, '1')
  })

axios({
  method: 'get',
  url: '/error/get1',
  params: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res, '2')
  })
  .catch(err => {
    console.log(err, '2')
  })

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000,
  params: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res, '3')
  })
  .catch((err: AxiosError) => {
    console.log(err, '3')
    console.log(err.code, '3')
    console.log(err.config, '3')
    console.log(err.message, '3')
    console.log(err.name, '3')
    console.log(err.request, 'request', '3')
    console.log(err.response, '3')
    console.log(err.stack, '3')
  })
