import {Composer, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {channelsCommandKeyboard} from "../keyboard/channels.command.keyboard";
import {postRequest} from "../../placeholder/fakeBackendDreamsResultAPI.placeholder";
import {ChannelValidator} from "../../validator/channel.validator";
import {IValidateChannelResponse} from "../../response/response.interface";
import {IUserChannel} from "../../user/user.interface";

const zeroStep = new Composer<MyContext>();

const zeroChannel = new Composer<MyContext>();
const firstChannel = new Composer<MyContext>();
const secondChannel = new Composer<MyContext>();
const thirdChannel = new Composer<MyContext>();
const channelValidator = new ChannelValidator()

zeroStep.on('text', async (ctx) => {
    const user = ctx.scene.session.state.user = {
        id : ctx.message.from.id,
        userChannels : []
    }
    await ctx.reply('Каналы сброшены. Введите название вашего телеграмм канала', channelsCommandKeyboard)
    await ctx.wizard.next()
})

zeroChannel.on('text', async (ctx) => {
    try {
        (ctx.scene.session.state.user.userChannels[0] as IUserChannel) = {
            title : ctx.message.text,
            parseChannels : [],
        }
        await ctx.reply('Канал успешно добавлен! Напишите название 1-го канала для парсинга', channelsCommandKeyboard)
        await ctx.wizard.next()
    }
    catch (e) {
        await ctx.reply('Произошла ошибка.')
        await ctx.scene.leave()
    }
})
firstChannel.on('text', async (ctx) => {
    try {
        const result = await channelValidator.validate('http://localhost:8081/api/validateChannel', {
            channelName : ctx.message.text
        }) as IValidateChannelResponse

        if (result.workerResult === 'Канал существует') {
            ctx.scene.session.state.user.userChannels[0].parseChannels.push(ctx.message.text)
            await ctx.reply('Канал успешно добавлен! Напишите название 2-го канала', channelsCommandKeyboard)
            await ctx.wizard.next()
        }
        else {
            await ctx.reply('Канала с таким именем не существует. Введите заново.', channelsCommandKeyboard)
        }
    }
    catch (e) {
        await ctx.reply('Произошла ошибка.')
        await ctx.scene.leave()
    }

})
secondChannel.on('text', async (ctx) => {
    try {
        const result = await channelValidator.validate('http://localhost:8081/api/validateChannel', {
            channelName : ctx.message.text
        }) as IValidateChannelResponse
        console.log(result)
        if (result.workerResult === 'Канал существует')  {
            ctx.scene.session.state.user.userChannels[0].parseChannels.push(ctx.message.text)
            await ctx.reply('Канал успешно добавлен! Напишите название 3-го канала', channelsCommandKeyboard)
            await ctx.wizard.next()
        }
        else {
            await ctx.reply('Канала с таким именем не существует. Введите заново.', channelsCommandKeyboard)

        }
    }
    catch (e) {
        await ctx.reply('Произошла ошибка.')
        await ctx.scene.leave()
    }

})
thirdChannel.on('text', async (ctx) => {
    try {
        const result = await channelValidator.validate('http://localhost:8081/api/validateChannel', {
            channelName : ctx.message.text
        }) as IValidateChannelResponse
        if (result.workerResult === 'Канал существует')  {
            ctx.scene.session.state.user.userChannels[0].parseChannels.push(ctx.message.text)
            await ctx.reply('3-ий канал успешно добавлен!')
            const result = await postRequest(ctx.scene.session.state.user.userChannels[0].parseChannels)
            console.log(JSON.stringify(ctx.scene.session.state.user))
            await ctx.scene.leave()
        }
        else {
            await ctx.reply('Канала с таким именем не существует. Введите заново.', channelsCommandKeyboard)
        }
    }
    catch (e) {
        await ctx.reply('Произошла ошибка.')
        await ctx.scene.leave()
    }

})



export const addChannelsScene = new Scenes.WizardScene<MyContext>(
    "addChannelsScene",
    zeroStep,
    zeroChannel,
    firstChannel,
    secondChannel,
    thirdChannel
);



