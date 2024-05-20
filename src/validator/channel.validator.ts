import {IRequestValidateChannelData} from "../request/request.interface";
import axios from "axios";
import {IValidateChannelResponse} from "../response/response.interface";
import {AxiosResponse} from "axios"

export interface IChannelValidator {
    validate(url : string, body : IRequestValidateChannelData) : Promise<IValidateChannelResponse | string>
}
export class ChannelValidator implements IChannelValidator{
    async validate(url : string, body : IRequestValidateChannelData) : Promise<IValidateChannelResponse | string> {
        try {
            const result : AxiosResponse<IValidateChannelResponse> = await axios.post(url, body)
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