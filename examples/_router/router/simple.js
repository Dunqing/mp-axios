module.exports = function(router) {
  router.get('/simple/get', (req, res) => {
    res.send('Hello world!')
  })
}
