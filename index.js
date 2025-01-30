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


const bot = new TelegramBot(token, { polling: true })
//bot start command
bot.onText(/\/start/, (msg) => actions.homeMenu(bot, msg.chat.id))

bot.on('callback_query', (query) => {
    const actionsCommand = ['google', 'microsoft']
    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const selectedActionsCommand = actionsCommand.find(item => item === command)
    const list = {
        selectLanguageText: `موتور ترجمه انتخابی شما : ${selectedActionsCommand} \n\n\n لطفا زبان مقصد را انتخاب کنید`
    }

    if (actionsCommand.includes(command)) {
        actions.sendTranslateKeyboard(bot, chatId, 'action', command, component[`${command}DesLang`], list.selectLanguageText, messageId, actionsCommand)
    }
    if (command === 'en') {
        client.set(`user:${chatId}:lang`, command)
    }
    if (command === 'fa') {
        client.set(`user:${chatId}:lang`, command)

    }
})
