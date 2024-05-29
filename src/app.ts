import {ConfigService} from "./config/config.service";
import {BotService} from "./bot/bot.service";


const bot = new BotService(new ConfigService())
bot.init()


