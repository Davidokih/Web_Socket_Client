import React,{useEffect,useState} from 'react'
import { ChatPage, Users } from '../../Components'
import "../../Global_Style.css"
import axios from 'axios'
// import {getUser} from "../../Endpoint/UserApi"

const Chats = () => {

  const [getUsers, setGetUsers] = useState([])
  const getUser = () => {
    axios.get("http://localhost:1000/api/user/").then((res) => {
      setGetUsers(res.data.data)
    })
  }
  // const {users} = getUser()
  console.log(getUsers)
  useEffect(() => {
    getUser()
  },[])
  return (
      <div className='w-[100%] flex align-center justify-center'>
      <div className='bg-gray-400 w-[35%] overflow-y-auto'><Users getUsers={ getUsers} /></div>
         <div className='chat-flex ml-3'> <ChatPage /></div>
    </div>
  )
}

export default Chats