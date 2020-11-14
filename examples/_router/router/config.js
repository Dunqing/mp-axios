module.exports = function(router) {
  router.post('/config/post', (req, res) => {
    res.json(req.body)
  })
}
