const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./_router/index')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

require('./server2.js')

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    sourceMap: true,
    stats: {
      colors: true,
      chunks: false
    }
  })
)
app.use(webpackHotMiddleware(compiler, {}))
app.use(cookieParser())

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/credentials/get', (req, res) => {
  res.json(req.cookies)
})

app.use(router)

// 将文件 serve 到 port 3000。
const port = 8080

app.listen(port, function() {
  console.log(`listen to http://127.0.0.1:${port}`)
})
