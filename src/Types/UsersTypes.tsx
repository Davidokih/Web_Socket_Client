

export interface userApi {
    conversation: {}[],
    setcurrentChat: React.Dispatch<React.SetStateAction<null | {}[]>>,
    user: {}
}

export interface Conversation {
    // getSingle_user?: () => void,
    a?: string,
    currentChat?: any,
    user: {}
    // userData?: {},
}

export interface SearchFunc{
    user: string,
    create: ()=>
}