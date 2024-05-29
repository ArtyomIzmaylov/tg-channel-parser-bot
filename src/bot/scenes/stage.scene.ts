import {Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {addChannelsScene} from "./addChannels.scene";
import {parseChannelsScene} from "./parseChannels.scene";

export const stage = new Scenes.Stage<MyContext>([addChannelsScene, parseChannelsScene]);
