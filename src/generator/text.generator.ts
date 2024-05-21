import {IResponseGenerateTexts} from "../response/response.interface";
import {IRequestSendChannels} from "../request/request.interface";
import axios, {AxiosResponse} from "axios";


export interface ITextGenerator {
    generate(url : string, body : IRequestSendChannels) : Promise<IResponseGenerateTexts | string>
}
export class TextGenerator implements ITextGenerator{
    async generate(url : string, body : IRequestSendChannels) : Promise<IResponseGenerateTexts | string> {
        try {
            console.log(JSON.stringify(body))
            const result : AxiosResponse<IResponseGenerateTexts> = await axios.post(url, body)
            return result.data
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            return JSON.stringify(error)
        }
    }

}