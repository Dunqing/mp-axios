var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// 剩下的
module.exports = function(router) {
  router.post('/more/csrf', (req, res) => {
    res.cookie('X-Token-Cookie-DengQing', 'success')
    res.json({ csrfToken: 'anytoken' })
  })

  router.get('/more/validate-status', (req, res) => {
    res.json({ msg: 'ok' })
  })

  router.get('/more/upload', upload.single('file'), (req, res) => {
    res.json({ msg: 'ok' })
  })
}
