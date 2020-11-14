const express = require('express')
const router = express.Router()

require('./router/base')(router)
require('./router/error')(router)
require('./router/extends')(router)
require('./router/simple')(router)

module.exports = router
