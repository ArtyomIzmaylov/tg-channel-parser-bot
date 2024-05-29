export interface IUserChannel {
    title : string
    parseChannels : string[]
}
export interface IUser {
    id : number
    userChannels : IUserChannel[] | []

}

export interface ISelectedChannelUser {
    title : string
    isSelected : boolean
    index : string
    channels : string[]
}

export interface ISaveChannelUser {
    title : string
    channels : string[]
}