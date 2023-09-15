import React, { useEffect, useState, ReactNode } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Private = (children: any) => {
    const navigate = useNavigate()
    const user_token = localStorage.getItem("auth_Token")

    const [user, setUser] = useState()
    const getUser = async () => {
        const config = {
            authorization: `Bearer ${user_token}`,
        };
        await axios.get("http://localhost:1000/api/user/single_user", { headers: config }).then((res) => {
            setUser(res.data.data)
        }).catch((error) => {
            alert("User Token as Expire")
            // console.log(error.message);
        })
    }
    useEffect(() => {
        getUser()
    },[])
  return (
      <div>{user ? children : navigate("/signin")  }</div>
  )
}

export default Private