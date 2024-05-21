import {Telegraf} from "telegraf";
import {Command} from "./command.class";
import {MyContext} from "../context/context.interface";
import {ChannelsFetcher} from "../../fetcher/channels.fetcher";



export class ParseChannelsCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('parseChannels', async (ctx) => {
            await ctx.scene.enter('parseChannelsScene')
        })
    }
}