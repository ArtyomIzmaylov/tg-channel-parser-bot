"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCategoryKeyboard = exports.adSpecialistButtons = void 0;
const telegraf_1 = require("telegraf");
exports.adSpecialistButtons = telegraf_1.Markup.keyboard([
    [telegraf_1.Markup.button.callback('Да', 'yes'), telegraf_1.Markup.button.callback('Нет', 'no')],
    [telegraf_1.Markup.button.callback('Назад', 'exit')
    ]
]).oneTime().resize();
function extractCategoryKeyboard(categories) {
    return categories.map((category) => {
        if (category.isSelected) {
            return [telegraf_1.Markup.button.callback(`${category.title}✅`, category.category)];
        }
        return [telegraf_1.Markup.button.callback(`${category.title}`, category.category)];
    });
}
exports.extractCategoryKeyboard = extractCategoryKeyboard;
