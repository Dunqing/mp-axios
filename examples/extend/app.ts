import axios from '../../src/index'

axios({
  url: '/extends/request',
  method: 'post',
  data: {
    method: 'post',
    desc: 'request'
  }
}).then(res => {
  console.log(res)
})

axios.get('/extends/get').then(res => {
  console.log(res)
})
axios
  .post('/extends/post', {
    method: 'post',
    desc: 'request'
  })
  .then(res => {
    console.log(res)
  })
axios
  .put('/extends/put', {
    method: 'put',
    desc: 'request'
  })
  .then(res => {
    console.log(res)
  })
axios
  .delete('/extends/delete', {
    method: 'delete',
    desc: 'request'
  })
  .then(res => {
    console.log(res)
  })
axios
  .patch('/extends/patch', {
    method: 'patch',
    desc: 'request'
  })
  .then(res => {
    console.log(res)
  })
