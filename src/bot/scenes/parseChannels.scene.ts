import {Composer, Markup, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {ChannelsFetcher} from "../../fetcher/channels.fetcher";
import {IResponseFetchChannels, IResponseGenerateTexts} from "../../response/response.interface";
import {IRequestSendChannels, IRequestUserChannel} from "../../request/request.interface";
import {TextGenerator} from "../../generator/text.generator";
import {ISelectedChannelUser} from "../../user/user.interface";

const zeroStep = new Composer<MyContext>();
const firstStep = new Composer<MyContext>()
const channelsFetcher = new ChannelsFetcher()
const textGenerator = new TextGenerator()

zeroStep.on('text', async (ctx) => {
    try {
        const fetchedChannels = await channelsFetcher.fetch('http://localhost:5000/api/getChannels', {
            telegramId : Number(ctx.from.id)
        }) as IResponseFetchChannels
        ctx.scene.session.state.userChannels = fetchedChannels.userChannels.map((channel, index=1) => {
            return {title : channel.title, isSelected : false, index : `chn_${index}`, channels : channel.parseChannels}
        }) as ISelectedChannelUser[]


        const channelsInlineKeyboard = ctx.scene.session.state.userChannels.map(
            channel => {
                console.log(channel.index)
                return [Markup.button.callback(channel.title, `${channel.index}`)]
            })

        await ctx.reply('Выберите каналы из списка', Markup.inlineKeyboard(channelsInlineKeyboard))
        await ctx.reply('Как выберите категории, можете продолжить', Markup.keyboard([
            [Markup.button.callback('Готово', 'findReady')],
        ],).oneTime().resize())
        await ctx.wizard.next()

    }
    catch (e) {
        console.log(e)
    }
})


firstStep.action(["chn_0", "chn_1", "chn_2"], async (ctx) => {
    try {
        const channel = ctx.match.input;
        console.log(channel)
        ctx.scene.session.state.userChannels = ctx.scene.session.state.userChannels.map(chn => {
            if (chn.index === channel) {
                chn.isSelected = !chn.isSelected
            }
            return chn
        })
        const channelsKeyboard = ctx.scene.session.state.userChannels.map(
            chn => {
                if (chn.isSelected) {
                    return [Markup.button.callback(chn.title + '✅', chn.index)]
                }
                return [Markup.button.callback(chn.title, chn.index)]
            })
        await ctx.editMessageReplyMarkup({
            inline_keyboard: channelsKeyboard
        });
    }
    catch {
    }

})


firstStep.hears('Готово', async (ctx) => {
    try {

        const sendData : IRequestSendChannels = {
            userChannels : ctx.scene.session.state.userChannels
                .filter(chn => chn.isSelected)
                .map(channel => {
                    return {
                        title : channel.title,
                        channels : channel.channels
                    }
                }) as IRequestUserChannel[]
        }
        const generatedTexts = await textGenerator.generate(
            'http://localhost:8081/api/parseChannels',
            sendData
        ) as IResponseGenerateTexts
        await ctx.reply(generatedTexts.result[0].data)
        await ctx.reply(generatedTexts.result[1].data)
        await ctx.reply('Контент успешно спарсился !')
        await ctx.scene.leave()
    }
    catch (e) {
        await ctx.scene.leave()
    }
})


export const parseChannelsScene = new Scenes.WizardScene<MyContext>(
    "parseChannelsScene",
    zeroStep,
    firstStep
);

