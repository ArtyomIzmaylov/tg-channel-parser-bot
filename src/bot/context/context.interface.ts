import {Context, Scenes} from "telegraf";
import {IMarkupCategoryButton} from "../keyboard/find.command.keyboard";



export interface IUserChannel {
    title : string
    parseChannels : string[]
}
export interface IUser {
    id : number
    userChannels : IUserChannel[] | []

}



interface MyWizardSession extends Scenes.WizardSessionData {
    state : {
        user : IUser
    }
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    user : IUser
}

export interface MyContext extends Context {
    myContextProp: string;
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}