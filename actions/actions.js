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
export default {homeMenu}