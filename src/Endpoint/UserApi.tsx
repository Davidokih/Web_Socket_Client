import axios from "axios";
import {useState} from "react"

export const getUser = () => {
    const [users, setUsers] = useState([])
    axios.get("http://localhost:1000/api/user/").then((res) => {
        // console.log(res.data)
        setUsers(res.data.data)
    })

    return {
        users
    }
}