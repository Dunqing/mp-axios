module.exports = function(router) {
  router.get('/extends/get', (req, res) => {
    res.send('extend get')
  })
  router.post('/extends/post', (req, res) => {
    res.json({
      msg: 'extend post',
      data: req.body
    })
  })
  router.put('/extends/put', (req, res) => {
    res.json({
      msg: 'extend put',
      data: req.body
    })
  })
  router.delete('/extends/delete', (req, res) => {
    res.json({
      msg: 'extend delete',
      data: req.body
    })
  })
  router.patch('/extends/patch', (req, res) => {
    res.json({
      msg: 'extend patch',
      data: req.body
    })
  })
  router.post('/extends/request', (req, res) => {
    res.json({
      msg: 'extend post',
      data: req.body
    })
  })
}
