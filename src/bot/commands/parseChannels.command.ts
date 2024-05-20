import {Telegraf} from "telegraf";
import {Command} from "./command.class";
import {MyContext} from "../context/context.interface";
import {ChannelsFetcher} from "../../fetcher/channels.fetcher";



const channelsFetcher = new ChannelsFetcher()
export class ParseChannelsCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('parseChannels', async (ctx) => {
            try {
                const fetchedChannels = await channelsFetcher.fetch('http://localhost:5000/api/getChannels', {
                    telegramId : 926411775
                })
                console.log(fetchedChannels)
            }
            catch (e) {

            }
        })
    }
}