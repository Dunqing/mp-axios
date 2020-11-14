import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: [1, 2, 3]
  }
})
  .then(() => {})
  .catch(() => {})

// mdn object.is;

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'get',
  url: '/base/get?default=test',
  params: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'get',
  url: '/base/get?default=test',
  params: {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  }
})

axios({
  method: 'get',
  url: '/base/get?default=test',
  params: {
    a: new Date(),
    b: new Date()
  }
})

axios({
  method: 'get',
  url: '/base/get?default=test',
  params: {
    a: '@',
    b: '[]'
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 'null和undefined',
    b: null,
    c: undefined
  }
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    hello: 'world'
  }
})

axios({
  method: 'post',
  url: '/base/buffer',
  data: new Int32Array([1, 2])
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    hello: 'world'
  }
})
  .then(res => {
    console.log(res, '未使用responseType')
  })
  .catch()

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json, text/plain, */*'
  },
  data: {
    hello: 'world'
  },
  responseType: 'json'
}).then(res => {
  console.log(res)
})

const data = new URLSearchParams('hello=world&hello2=world2')
axios({
  method: 'post',
  url: '/base/post',
  data: data
})
