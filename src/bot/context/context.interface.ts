import {Context, Scenes} from "telegraf";
import {ISelectedChannelUser, IUser} from "../../user/user.interface";






interface MyWizardSession extends Scenes.WizardSessionData {
    state : {
        user : IUser
        userChannels : ISelectedChannelUser[]
    }
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    user : IUser
    userChannels : ISelectedChannelUser[]
}

export interface MyContext extends Context {
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}



