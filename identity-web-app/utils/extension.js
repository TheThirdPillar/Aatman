const extensionId = 'jfjlbdapmilmhjhcjmkjngemobhkjpgh';

const connectToExtension = (request) => {
        return new Promise((resolve, reject) => {
            try {
                chrome.runtime.sendMessage(extensionId, request, (response) => {
                    if (chrome.runtime.lastError) reject(false)
                    if (response && response.status === 'SUCCESS') {
                        resolve(response)
                    } else {
                        reject(false)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
}

export default connectToExtension