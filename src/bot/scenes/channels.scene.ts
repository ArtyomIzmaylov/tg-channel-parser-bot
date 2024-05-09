import {Composer, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {channelsCommandKeyboard} from "../keyboard/channels.command.keyboard";


const firstChannel = new Composer<MyContext>();

firstChannel.on('text', async (ctx) => {
    await ctx.reply('Напишите название канала')
    await ctx.reply('Выберете', channelsCommandKeyboard)
})








const channelsScene = new Scenes.WizardScene<MyContext>(
    "channelsScene",
    firstChannel,
);

export const stage = new Scenes.Stage<MyContext>([channelsScene]);
