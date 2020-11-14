const express = require('express')
const router = express.Router()

require('./router/simple')(router)
require('./router/base')(router)
require('./router/error')(router)
require('./router/extends')(router)
require('./router/interceptor')(router)
require('./router/config')(router)

module.exports = router
