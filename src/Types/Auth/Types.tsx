import React,{ChangeEvent} from "react"

export interface InputNames  {
    nameOfInput: string,
    name: string,
    errors?: string,
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    callback?: ()=> void
}

export interface ChatMessage {
    own?: boolean,
    message?: any
}