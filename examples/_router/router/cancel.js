module.exports = function(router) {
  router.get('/cancel/get', (req, res) => {
    // res.send(`url: ${req.url}`)
    res.send(req.query)
  })
  router.post('/cancel/cancel', (req, res) => {
    // res.send(`url: ${req.url}`)
    setTimeout(() => {
      res.send(req.body)
    }, 3000)
  })
}
