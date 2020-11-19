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

  router.get('/more/serializer', (req, res) => {
    res.json({ msg: 'ok' })
  })

  router.post('/more/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ msg: 'ok', ...req.file, path: 'http://127.0.0.1:8080/' + req.path.replace('\\\\', '/') })
  })
}
