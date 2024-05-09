"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelsCommandKeyboard = void 0;
const telegraf_1 = require("telegraf");
exports.channelsCommandKeyboard = telegraf_1.Markup.keyboard([
    [telegraf_1.Markup.button.callback('Сохранить текущий канал', 'saveChannel'), telegraf_1.Markup.button.callback('Изменить канал', 'addChannel')],
    [telegraf_1.Markup.button.callback('Выйти', 'exit')
    ]
]).oneTime().resize();
