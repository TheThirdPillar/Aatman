const extensionId = ''

const connectToExtension = (request) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(extensionId, request, (response) => {
                if (chrome.runtime.lastError) reject(false)
                if (response && response.status === 'SUCCESS') {
                    resolve(response)
                } else {
                    reject(false)
                }
            })
        })
}

export default connectToExtension