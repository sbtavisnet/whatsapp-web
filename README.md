## Instalação - baseado na documentação: 
#  https://www.dio.me/articles/criar-um-bot-whatsapp-com-nodejs

npm init -y
npm install --save whatsapp-web.js // cliente para Whatsapp
npm install --save qrcode-terminal // Gera um QR dentro do terminal
npm install -- save express // Cria nossa API
npm install --save cors // Libera os CORS para a API

npm i whatsapp-web.js


**** Inciando um projeto typescript

npm i typescript -D
npm ts-node-dev -D

npm i type@typescript -D
npm i  @types/express --save-dev

@types/socket.io

npx tsc --init

=========================================


"scripts": {
    "start": "node ./build/start.js",
    "build": "tsc",
    "dev": "ts-node-dev ./src/start.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },



