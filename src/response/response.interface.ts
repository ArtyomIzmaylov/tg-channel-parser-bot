

enum IValidateChannelStatus {
    ChannelExists = 'Канал существует',
    ChannelDoesNotExists = 'Канал не существует'
}
export interface IValidateChannelResponse {
    data : {
        workerResult : string
    }
}


export interface IResponseUserChannels {
    title : string,
    parseChannels : string[]
}
export interface IResponseFetchChannels {
    telegramId : number,
    userChannels : IResponseUserChannels[]
}


interface IResponseGOService {
    data : string
    response_key : string
    response_message : string
}
export interface IResponseGenerateTexts {
    result : IResponseGOService[]
}