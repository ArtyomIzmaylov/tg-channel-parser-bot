import {Composer, Markup, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {ChannelsFetcher} from "../../fetcher/channels.fetcher";
import {IResponseFetchChannels, IResponseGenerateTexts} from "../../response/response.interface";
import {IRequestSendChannels, IRequestUserChannel} from "../../request/request.interface";
import {TextGenerator} from "../../generator/text.generator";
import {ISelectedChannelUser} from "../../user/user.interface";

const zeroStep = new Composer<MyContext>();
const firstStep = new Composer<MyContext>()
const secondStep = new Composer<MyContext>()

const channelsFetcher = new ChannelsFetcher()
const textGenerator = new TextGenerator()

zeroStep.on('text', async (ctx) => {
    try {
        const fetchedChannels = await channelsFetcher.fetch('http://localhost:5000/api/getChannels', {
            telegramId : Number(ctx.from.id)
        }) as IResponseFetchChannels
        const userChannels = fetchedChannels.userChannels.map((channel, index) => {
            return {title : channel.title, isSelected : false, index : `chn_${index}`, channels : channel.parseChannels}
        }) as ISelectedChannelUser[]
        ctx.scene.session.state.userChannels = userChannels

        await ctx.reply('Выберите каналы',  Markup.inlineKeyboard(
            [
                    [Markup.button.callback(userChannels[0].title, 'chn_0')],
                    [Markup.button.callback(userChannels[1].title, 'chn_1')],
                    [Markup.button.callback(userChannels[2].title, 'chn_2')],
                    [Markup.button.callback('Выйти', 'Выйти')],

            ]
        ))
        await ctx.wizard.next()

    }
    catch (e) {
        console.log(e)
    }
})


firstStep.action(['chn_0', 'chn_1', 'chn_2', 'Выйти'], async (ctx) => {
    console.log(ctx.match.input)
    if (ctx.match.input === 'Выйти') {
        await ctx.scene.leave()
        await ctx.editMessageText('Вы вышли. Если захотите снова искать, используйте команда /parseChannels')

    }
    else {
        const userChannel = (ctx.scene.session.state.userChannels).find(channel => channel.index === ctx.match.input) as ISelectedChannelUser
        const sendData : IRequestSendChannels = {
            userChannels : [
                {
                    title : userChannel.title,
                    channels : userChannel.channels
                }
            ]
        }
        const generateText= await textGenerator.generate('http://localhost:8081/api/parseChannels', sendData) as IResponseGenerateTexts
        await ctx.reply(generateText.result[0].data)
        await ctx.reply(`Контент для канала ${userChannel.title} успешно сгенерировался. Примите решение`,  Markup.inlineKeyboard(
            [
                [Markup.button.callback('Удалить ссылки', 'deleteAdds')],
                [Markup.button.callback('Перегенерировать', 'regenerate')],
                [Markup.button.callback('Готово', 'exit')],

            ]
        ))

        await ctx.scene.leave()
    }

})


export const parseChannelsScene = new Scenes.WizardScene<MyContext>(
    "parseChannelsScene",
    zeroStep,
    firstStep
);

