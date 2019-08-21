/* global io btoa */

// IMPORTANT: watchify main.js -o bundle.js -v
// 用 watchify 將 main.js 變成 bundle.js

const zlib = require('browserify-zlib')
var arrayBufferToBuffer = require('arraybuffer-to-buffer')

const socket = io()
let data = null
socket.on('image', (image) => {
  // if (!data) {
  const t = Date.now()
  // console.log(image)
  // console.log(arrayBufferToBuffer(image))
  data = zlib.gunzipSync(arrayBufferToBuffer(image))
  // console.log(data)
  const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)))
  // console.log(Date.now() - t)
  const imageElm = document.getElementById('image')
  imageElm.src = `data:image/jpeg;base64,${base64String}`
  // }
})
