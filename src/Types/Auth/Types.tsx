import React,{ChangeEvent} from "react"

export interface InputNames  {
    nameOfInput: string,
    name: string,
    errors?: string,
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    callback?: ()=> void
}


export interface InputValues {
    email?: string | undefined,
    userName?: string | undefined,
    phone_No?: string | undefined,
    password?: string | undefined
}