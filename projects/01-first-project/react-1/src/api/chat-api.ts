


let subscribers = [] as Array<subscriberType>

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createWSChannel, 3000)
}

const messageHandler = (event: MessageEvent) => {
    let newMessages = JSON.parse(event.data)
    subscribers.forEach( s => s(newMessages))
}

function createWSChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

const chatAPI = {
    start() {
        createWSChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: subscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: subscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export default chatAPI

type subscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType =  {
    message: string
    photo: string
    userId: number
    userName: string
}