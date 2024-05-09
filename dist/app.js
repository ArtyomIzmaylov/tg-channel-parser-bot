"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_service_1 = require("./config.service");
const start_command_1 = require("./bot/commands/start.command");
const channels_command_1 = require("./bot/commands/channels.command");
const channels_scene_1 = require("./bot/scenes/channels.scene");
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get('TOKEN'));
    }
    init() {
        this.bot.use((0, telegraf_1.session)());
        this.bot.use(channels_scene_1.stage.middleware());
        this.commands = [
            new start_command_1.StartCommand(this.bot), new channels_command_1.ChannelsCommand(this.bot)
        ];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}
const bot = new Bot(new config_service_1.ConfigService());
bot.init();
