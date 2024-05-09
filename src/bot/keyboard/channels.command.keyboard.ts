import {Markup} from "telegraf";



export const channelsCommandKeyboard = Markup.keyboard(
    [
        [Markup.button.callback('Сохранить текущий канал', 'saveChannel'), Markup.button.callback('Изменить канал', 'addChannel')],
        [Markup.button.callback('Выйти', 'exit')
        ]
    ]).oneTime().resize()

