const TelegramBot = require('node-telegram-bot-api')
const token = '7404861031:AAEUkfJF28n9NyodeBPr7N15R3UCpef7h4M'
const actions = require('./actions/actions').default


const bot = new TelegramBot(token, { polling: true })
//bot start command
bot.onText(/\/start/, (msg) => actions.homeMenu(bot, msg.chat.id))
