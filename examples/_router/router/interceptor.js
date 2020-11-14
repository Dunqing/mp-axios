module.exports = function(router) {
  router.get('/interceptor/get', (req, res) => {
    res.json({
      msg: 'interceptor',
      data: req.query
    })
  })
}
