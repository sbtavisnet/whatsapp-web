import { Client, MessageMedia } from 'whatsapp-web.js'

//const appController = {}
//const { MessageMedia } = require('whatsapp-web.js')

const appUtils = require('./appUtils')

let client: Client

class AppController {

  send = async (req, res) => {
    const number = await appUtils.getNumber(req.body.number)
    const message = req.body.message

    await appUtils.getClient().then((cli) => {
      client = cli
    })

    await this.sendMessage(res, number, message)
  }

  sendMessage = async (res, number, message) => {
    await client
      .sendMessage(number, message)
      .then((response) => {
        res.status(200).json({
          status: true,
          message: 'Mensagem enviada ...',
          response: response,
        })
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: 'Mensagem não enviada ...',
          response: err.text,
        })
      })
  }

  sendMedia = async (req, res) => {
    await this.sendMessageMedia(req, res)
  }

  // Send media
  sendMessageMedia = async (req, res) => {
    await appUtils.getClient().then((cli) => {
      client = cli
    })

    const number = await appUtils.getNumber(req.body.number)
    let caption = req.body?.caption
    const mime = req.body?.file?.mime
    const file = req.body?.file?.data
    if (caption === undefined) caption = 'arquivo'

    const media = await new MessageMedia(mime, file.toString('base64'), caption)

    await client
      .sendMessage(number, media, {
        caption: caption,
      })
      .then((response) => {
        res.status(200).json({
          status: true,
          mensagem: 'Arquivo enviado com sucesso !!!',
          //response: response,
        })
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          mensagem: err,
          //response: err,
        })
      })
  }

  state = async (req, res) => {
    await appUtils.getClient().then((cli) => {
      client = cli
    })

    const ret = await client.getState()
    let status = false
    if (ret === 'CONNECTED') {
      status = true
    }
    res.status(200).json({
      status: status,
      mensagem: 'State da conexão: ' + ret,
    })
  }

  // retorna a versao whatsapp
  versao = async (req, res) => {
    await appUtils.getClient().then((cli) => {
      client = cli
    })

    const ret = await client.getWWebVersion()
    res.status(200).json({
      status: true,
      mensagem: 'versão do whatsapp: ' + ret,
    })
  }

  // index
  qrcode = (req, res) => {
    res.sendFile('index.html', {
      root: __dirname,
    })
  }

}

module.exports = new AppController


//module.exports = appController

// exemplo de JSON para envio de arquivo
// {
//   "number"  : "33988240276",
//   "caption": "arquivo.pdf",
//   "file": {
//     "mime": "application/pdf",
//     "data": "DO4LLXOOM,$"      // ARQUIVO EM BASE64
//   }
// }
