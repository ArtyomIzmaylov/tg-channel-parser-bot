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
exports.stage = void 0;
const telegraf_1 = require("telegraf");
const channels_command_keyboard_1 = require("../keyboard/channels.command.keyboard");
const firstStep = new telegraf_1.Composer();
firstStep.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Выберете', channels_command_keyboard_1.channelsCommandKeyboard);
}));
const channelsScene = new telegraf_1.Scenes.WizardScene("channelsScene", firstStep);
exports.stage = new telegraf_1.Scenes.Stage([channelsScene]);
