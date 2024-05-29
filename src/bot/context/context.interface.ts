import {Context, Scenes} from "telegraf";
import {ISaveChannelUser, ISelectedChannelUser, IUser} from "../../user/user.interface";






interface MyWizardSession extends Scenes.WizardSessionData {
    state : {
        user : IUser
        userChannels : ISelectedChannelUser[]
        saveChannelUser : ISaveChannelUser
    }
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    user : IUser
    userChannels : ISelectedChannelUser[]
    saveChannelUser : ISaveChannelUser
}

export interface MyContext extends Context {
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}



