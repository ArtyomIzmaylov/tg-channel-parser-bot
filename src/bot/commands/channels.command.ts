import {Telegraf} from "telegraf";
import {Command} from "./command.class";
import {MyContext} from "../context/context.interface";
import {channelsCommandKeyboard} from "../keyboard/channels.command.keyboard";


export class ChannelsCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('addChannels', async (ctx) => {
            await ctx.reply('В бесплатной версиии вы можете добавить 5 каналов, с которых вы будете парсить контент')
            await ctx.scene.enter('addChannelsScene')
        })
    }
}