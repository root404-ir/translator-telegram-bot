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
    const languages = ['fa', 'en']
    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const selectedActionsCommand = actionsCommand.find(item => item === command)
    const selectedLanguage = languages.find(lang => lang === command)
    const listMessages = {
        selectLanguageText: `موتور ترجمه انتخابی شما : ${selectedActionsCommand} \n\n\n لطفا زبان مقصد را انتخاب کنید`,
        sendQuery: `زبان مقصد انتخابی شما : ${selectedLanguage} \n\n\n لطفا متنی که میخواهید ترجمه بشه رو ارسال کنید...`
    }

    actionsCommand.includes(command) ? actions.sendTranslateKeyboard(bot, chatId, 'action', command, component[`${command}DesLang`], listMessages.selectLanguageText, messageId, actionsCommand) : false

    languages.includes(command) ? actions.sendLanguage(bot, chatId, command, listMessages.sendQuery) : false
})

bot.on('polling_error', (error) => {
    console.log(`polling error ${error}`);

})