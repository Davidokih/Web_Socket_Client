import React, { ChangeEvent } from "react";
import { InputValues } from "../Types/Auth/Types";

type Errors = {
    [key: string]: string
}
const omit = (key: string, {[key]: _,...obj}: Errors)=> obj
const useFrom = () => {
    const [values, setValues] = React.useState<InputValues>()
    const [errors, setErrors] = React.useState<Errors>({})

    const validate = (name: string, value: string) => {
        switch (name) {
            case "userName":
                if (value.length <= 2) {
                    setErrors({
                        ...errors,
                        userName: "userName must have atleast 3 letters"
                    })
                } else {
                    const newObj = omit("userName", errors)
                    setErrors(newObj)
                }
            break;
            case "phone_No":
                if (!new RegExp(/^([0-9])/).test(value)) {
                    setErrors({
                        ...errors,
                        phone_No: "phone_No must have atleast 11 numbers"
                    })
                }else {
                    const newObj = omit("phone_No", errors)
                    setErrors(newObj)
                }
            break;
            case "email":
                if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                }else {
                    const newObj = omit("email", errors)
                    setErrors(newObj)
                }
            break;
            case 'password':
                if(value.length <= 6){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 6 charaterss'
                    })
                }else {
                    const newObj = omit("password", errors)
                    setErrors(newObj)
                }
            break
            default:
                break;
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const name = event.target.name
        const val = event.target.value

        validate(name,val);
        
        setValues({
            ...values,
            [name]: val
        })
    }
    

    return {
        values,
        errors,
        handleChange,
    }
}

export default useFrom