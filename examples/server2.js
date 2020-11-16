const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/credentials/cors', (req, res) => {
  res.set(cors)
  res.json(req.cookie)
})

router.options('/credentials/cors', (req, res) => {
  res.set(cors)
  res.end()
})

app.use(router)

// 将文件 serve 到 port 3000。
const port = 8088

app.listen(port, function() {
  console.log(`credentials to http://127.0.0.1:${port}`)
})
