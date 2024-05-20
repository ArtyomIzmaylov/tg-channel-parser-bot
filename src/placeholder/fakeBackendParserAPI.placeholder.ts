

export async function getRequest(channel : string) {
    const availableChannels = 'channel'
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (channel === availableChannels) {
        return {status : 200}
    }
    return {status : 404}
}