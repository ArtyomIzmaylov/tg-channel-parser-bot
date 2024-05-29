

export async function postRequest(channels : string[]) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {status : 200, channels : channels}
}