

enum IValidateChannelStatus {
    ChannelExists = 'Канал существует',
    ChannelDoesNotExists = 'Канал не существует'
}
export interface IValidateChannelResponse {
    workerResult : string
}