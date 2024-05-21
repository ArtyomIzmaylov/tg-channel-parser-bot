import {session, Telegraf} from "telegraf";
import {MyContext} from "./context/context.interface";
import {Command} from "./commands/command.class";
import {IConfigService} from "../config/config.interface";
import {stage} from "./scenes/stage.scene";
import {StartCommand} from "./commands/start.command";
import {ChannelsCommand} from "./commands/channels.command";
import {ParseChannelsCommand} from "./commands/parseChannels.command";

export class BotService {
    bot : Telegraf<MyContext>;
    commands : Command[] = [];
    constructor(private readonly configService : IConfigService) {
        this.bot = new Telegraf<MyContext>(this.configService.get('TOKEN'));
    }
    init() {
        this.bot.use(session())
        this.bot.use(stage.middleware())
        this.commands = [
            new StartCommand(this.bot), new ChannelsCommand(this.bot), new ParseChannelsCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }
        this.bot.launch()
    }

}
