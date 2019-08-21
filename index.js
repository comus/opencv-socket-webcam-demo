const fs = require('fs')
const express = require('express')
const zlib = require('zlib')
const cv = require('opencv4nodejs')

const app = express()
const http = require('https').createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
const io = require('socket.io')(http)
const port = 443

const FPS = 12
const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 320)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 240)

app.use(express.static('public'))

setInterval(() => {
  const frame = wCap.read()
  const image = cv.imencode('.jpg', frame, [cv.IMWRITE_JPEG_QUALITY, 20])
  io.emit('image', zlib.gzipSync(image, { level: 9 }))
}, 1000 / FPS)

http.listen(port, () => console.log(`listening on port ${port}!`))
