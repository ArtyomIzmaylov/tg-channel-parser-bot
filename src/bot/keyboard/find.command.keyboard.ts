import {Markup} from "telegraf";

export interface IMarkupCategoryButton {
    text : string;
    data : string
}


export const adSpecialistButtons = Markup.keyboard(
    [
        [Markup.button.callback('Да', 'yes'), Markup.button.callback('Нет', 'no')],
        [Markup.button.callback('Назад', 'exit')
        ]
    ]).oneTime().resize()


export function extractCategoryKeyboard(categories : any)  {
    return categories.map((category : any) => {
        if (category.isSelected) {
            return [Markup.button.callback(`${category.title}✅`, category.category)]
        }
        return [Markup.button.callback(`${category.title}`, category.category)]
    })

}