module.exports = function(router) {
  // error
  router.get('/error/get', (req, res) => {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'OK'
      })
    } else {
      res.status(500)
      res.send()
    }
  })

  router.get('/error/timeout', (req, res) => {
    setTimeout(() => {
      res.json({
        msg: 'OK'
      })
    }, 3000)
  })
}
