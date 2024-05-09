"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsCommand = void 0;
const command_class_1 = require("./command.class");
class ChannelsCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.command('channels', (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply('В бесплатной версиии вы можете добавить 5 каналов, с которых вы будете парсить контент');
            yield ctx.scene.enter('channelsScene');
        }));
    }
}
exports.ChannelsCommand = ChannelsCommand;
