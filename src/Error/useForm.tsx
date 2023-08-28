import React from "react";

const omit = (key: any, {[key]: _,...obj})=> obj
const useFrom = () => {
    const [values, setValues] = React.useState({})
    const [errors, setErrors] = React.useState({})

    const validate = (event: any, name: any, value: any) => {
        switch (name) {
            case "userName":
                if (value.length <= 2) {
                    setErrors({
                        ...errors,
                        userName: "userName must have atleast 3 letters"
                    })
                } else {
                    let newObj = omit("userName", errors)
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
                    let newObj = omit("phone_No", errors)
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
                }
            break;
            case 'password':
                if(value.length <= 6){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 6 charaterss'
                    })
                }else {
                    let newObj = omit("password", errors)
                    setErrors(newObj)
                }
            break
            default:
                break;
        }
    }

    const handleChange = (event: any) => {
        event.persist()
        let name = event.target.name
        let val = event.target.value

        validate(event,name,val);
        
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