module.exports = function(router) {
  router.get('/base/get', (req, res) => {
    // res.send(`url: ${req.url}`)
    res.send(req.query)
  })

  router.post('/base/post', (req, res) => {
    res.json(req.body)
  })

  router.post('/base/buffer', (req, res) => {
    const msg = []
    req.on('data', data => {
      if (data) {
        msg.push(data)
      }
    })

    req.on('end', () => {
      const buf = Buffer.concat(msg)
      console.log(buf)
      res.json(buf.toJSON())
    })
  })
}
