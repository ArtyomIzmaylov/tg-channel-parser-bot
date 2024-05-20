import {session, Telegraf} from "telegraf";
import {MyContext} from "./bot/context/context.interface";
import {Command} from "./bot/commands/command.class";
import {IConfigService} from "./config.interface";
import {StartCommand} from "./bot/commands/start.command";
import {ChannelsCommand} from "./bot/commands/channels.command";
import {stage} from "./bot/scenes/addChannels.scene";
import {ConfigService} from "./config.service";

class Bot {
    bot : Telegraf<MyContext>;
    commands : Command[] = [];
    constructor(private readonly configService : IConfigService) {
        this.bot = new Telegraf<MyContext>(this.configService.get('TOKEN'));
    }
    init() {
        this.bot.use(session())
        this.bot.use(stage.middleware())
        this.commands = [
            new StartCommand(this.bot), new ChannelsCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }
        this.bot.launch()
    }

}



const bot = new Bot(new ConfigService())
bot.init()


