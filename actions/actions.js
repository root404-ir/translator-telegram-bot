const redis = require('redis')
const client = redis.createClient()
client.connect()
/**
* Sends a translated keyboard to a user.
* @param {object} bot - The Telegram bot instance.
* @param {number} chatId - Chat ID of the user.
* @param {string} field - A string field to store in Redis.
* @param {string} command - The command to be stored.
* @param {object} keyboard - Inline keyboard markup.
* @param {string} textMessage - The message text.
* @param {number} messageId - The ID of the message to edit.
*/
const sendTranslateKeyboard = (bot, chatId, field, command, keyboard, textMessage, messageId, actionsCommand) => {
    client.set(`user:${chatId}:${field}`, command, {
        EX: 180
    })
    const inline_keyboard = keyboard
    bot.editMessageText(textMessage, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: inline_keyboard.reply_markup
    })
}
const sendLanguage = (bot, chatId, lange, message) => {
    client.set(`user:${chatId}:lang`, lange, {
        EX: 180
    })
    bot.sendMessage(chatId, message)
}
const homeMenu = (bot, chatId) => {
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'ترجمه با Google(🇺🇸)', callback_data: "google" },
                    { text: 'ترجمه با Microsoft(🇺🇸)', callback_data: "microsoft" }
                ]
            ]
        }
    }
    bot.sendMessage(chatId, 'سلام به ربات لکسو خوش آمدید \n \n برای ادامه لطفا موتور ترجمه خودرا انتخاب کنید', inlineKeyboard)
}
module.exports = { homeMenu, sendTranslateKeyboard, sendLanguage }