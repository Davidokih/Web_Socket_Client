

export interface userApi {
    setcurrentChat: React.Dispatch<React.SetStateAction<null |IConversation >>
    conversation: IConversation
}

export interface Conversation {
    // getSingle_user?: () => void,
    a?: string,
    currentChat?: IConversation | null,
    user: IUser | undefined
    // userData?: {},
}

export interface IConversation{
    members: [],
    _id?:string
}
export interface SearchFunc{
    user: string | undefined
}


export interface IUser {
    email?: string
    phone?: number
    password?: string
    userName: string
    _id?: string
}

export interface ChatMessage {
    own?: boolean,
    message?: IMessages
}

export interface IMessages {
    message: string
    sendeId: string
    conversationId?: string
    createdAt?:string
}