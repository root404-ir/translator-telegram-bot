//packages
const TelegramBot = require('node-telegram-bot-api')
const redis = require('redis')

//config
const client = redis.createClient()
client.connect()
const token = '7404861031:AAEUkfJF28n9NyodeBPr7N15R3UCpef7h4M'

//utils
const actions = require('./actions/actions')
const component = require('./components/component')
const messages = require('./utils/messages')


const bot = new TelegramBot(token, { polling: true })
//bot start command
bot.onText(/\/start/, (msg) => actions.homeMenu(bot, msg.chat.id))

bot.on('callback_query', (query) => {
    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id

    if (command === 'google') {
        actions.sendTranslateKeyboard(bot, chatId, 'action', command, component.googleDesLang, messages.list.selectLanguageText, messageId)
    }
    if (command === 'microsoft') {
        client.set(`user:${chatId}:action`, command)
        const keyboard = component.microsoftDesLang
        bot.sendMessage(chatId, list.selectLanguageText, keyboard)
    }
    if (command === 'en') {
        client.set(`user:${chatId}:lang`, command)

    }
    if (command === 'fa') {
        client.set(`user:${chatId}:lang`, command)

    }
})
