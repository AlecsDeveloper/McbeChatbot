<h1 style="color:blue"> MCBE Discord Bot </h1>

---

## Installation:

- Download [NodeJS](https://nodejs.org)
- Create a folder
- Open a cmd with folder dir
- Runs this commands:
```sh
npm init -y
npm i discord.js
npm i bedrock-protocol
npm i fs
npm i path
npm i webhook-discord
npm i colors
```

My [discord](https://discord.gg/96Uyt3KWT5) sevrer

--- 

- ## Bot features:
    - Chatbot
    - Fakeplayer
    - Server Data

- ## Node Packages:
    - discord.js
    - bedrock-protocol
    - fs
    - path
    - webhook-discord
    - colors

---

- ## Server.json file
```json
{
    "host": "localhost", // Server ip
    "port": 19132, // Server port
    "version": "1.17.10", // Mc version
    "offline": true // Ms auth, keep on true
}
```

- ## Config.json file
```json
{
    "token": "", // Bot Token
    "user": "", // Webhook author
    "avatar": "", // Webook avatar (link)
    "webhookMsgs": "", // Webhook link
    "channelID": "", // Channel id reads (chatbot read messages)
    "channelLogs": "" // Channel id Bot sends logs (fakeplayer, chatbot, etc)
}
```

---

## Runs `node .` on cmd

## ***Note:***
for this to work, the server must have the default player permissions on `operator` also have cheats enabled in `server.properties` and `online-mode` turn `false`