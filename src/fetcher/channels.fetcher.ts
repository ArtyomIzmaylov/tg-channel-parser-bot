import {IRequestFetchCChannels} from "../request/request.interface";
import {IResponseFetchChannels} from "../response/response.interface";
import axios, {AxiosResponse} from "axios";

export interface IChannelsFetcher {
    fetch(url : string, body : IRequestFetchCChannels) : Promise<IResponseFetchChannels | string>
}
export class ChannelsFetcher implements IChannelsFetcher {
    async fetch(url : string, body : IRequestFetchCChannels) : Promise<IResponseFetchChannels | string> {
        try {
            const result : AxiosResponse<IResponseFetchChannels> = await axios.post(url, body)
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