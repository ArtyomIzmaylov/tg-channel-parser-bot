

enum IValidateChannelStatus {
    ChannelExists = 'Канал существует',
    ChannelDoesNotExists = 'Канал не существует'
}
export interface IValidateChannelResponse {
    workerResult : string
}


interface IResponseUserChannels {
    title : string,
    parseChannels : string[]
}
export interface IResponseFetchChannels {
    telegramId : number,
    userChannels : IResponseUserChannels[]
}
