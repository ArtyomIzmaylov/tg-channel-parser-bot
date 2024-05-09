import {Context, Scenes} from "telegraf";
import {IMarkupCategoryButton} from "../keyboard/find.command.keyboard";



interface MyWizardSession extends Scenes.WizardSessionData {
    state : {
        selectedCategories: any[];
        markupCategoryKeyboardProp : IMarkupCategoryButton[];
    }
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    selectedCategories: string[];
}

export interface MyContext extends Context {
    myContextProp: string;
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}