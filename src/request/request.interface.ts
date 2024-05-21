
export interface IRequestValidateChannelData {
    channelName : string
}

export interface IRequestFetchCChannels {
    telegramId : number
}


export interface IRequestUserChannel {
    title : string
    channels : string[]
}
export interface IRequestSendChannels {
    userChannels : IRequestUserChannel[]
}