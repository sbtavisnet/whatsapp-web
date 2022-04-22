import { Client, LocalAuth } from 'whatsapp-web.js'
const qrcode = require('qrcode')

const express = require('express')
const http = require('http')


const port = process.env.PORT || 3001

const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.json({ limit: '5mb' }))

app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Utilitarios
const appUtils = require('./appUtils')

// ***** Rotas
const appRoutes = require('./appRouter')
app.use(appRoutes)

// **********  Whatsapp-web

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
})

client.initialize()


client.on('message', (msg) => {
  if (msg.body == '!ping') {
    msg.reply('pong')
  }
})

// Socket IO
io.on('connection', (socket) => {
  socket.emit('message', 'Conectando !!!')
  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr)
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url)
      socket.emit('message', 'QR Code, scaneie por favor !!!')
    })
  })

  client.on('ready', () => {
    socket.emit('ready', 'Dispositivo pronto !!!')
    socket.emit('message', 'Dispositivo pronto !!!')
  })

  client.on('authenticated', () => {
    socket.emit('authenticated', 'Whatsapp está autenticado !!!')
    socket.emit('message', 'Whatsapp está autenticado !!!')
    console.log('AUTHENTICATED')
  })

  client.on('auth_failure', function (session) {
    socket.emit('message', 'Auth failure, restarting...')
  })

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Aparalho desconectado !!!')
    client.destroy()
    client.initialize()
  })
})


appUtils.setClient(client)

// ** servidor
server.listen(port, () => {
  console.log('Aplicação rodando na porta *: ' + port)
})

//https://github.com/ngekoding/whatsapp-api-tutorial
