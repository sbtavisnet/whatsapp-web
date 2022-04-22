import { Router } from 'express';
const appController = require('./appController')
const router = Router()

router.post('/send', appController.send)
router.post('/send-media', appController.sendMedia)
router.get('/state', appController.state)
router.get('/versao', appController.versao)
router.get('/', appController.qrcode)

module.exports = router
