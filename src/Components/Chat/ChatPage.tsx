import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import axios from 'axios'
import { Conversation } from '../../Types/UsersTypes'
// import { userContext } from '../../GlobalState/Global'


// type messageData = {
//   message: string;
//   senderId: string;
// }
const ChatPage:React.FC<Conversation> = ({currentChat,user}) => {

  // const val = useContext(userContext)
  const [messages, setMessages] = useState()
  const [message, setMessage] = useState("")
  const user_token = localStorage.getItem("auth_Token")

  const get_messages = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    await axios.get("http://localhost:1000/api/message", { headers: config }).then((res) => {
      setMessages(res.data.data)
      // console.log(res.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }
  // console.log(currentChat);

  const sendMessage = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    await axios.post("http://localhost:1000/api/message/create", {message:message,conversationId:""},{ headers: config }).then((res) => {
      console.log(res.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  useEffect(() => {
    get_messages()
  },[])
  return (
    <div className='flex flex-col justify-between h-[100vh]'>
      {
        currentChat ? 
          <>
            <div className='h-[100%] overflow-y-auto'>
              {
                messages?.map((props: any) => {
                  <Messages message={props} own={ props.sendeId === user?.id} />
                })
              }
            </div>
            <div className='flex items-center my-2'>
              <textarea placeholder='Message' className='bg-gray-400 px-2 border-2 outline-none w-[100%] font-normal bg-transparent' onChange={ (e) => {
                setMessage(e.target.value)
              }}/>
              <button className='ml-2 py-2 px-6 bg-blue-400 rounded'>Send</button>
            </div>
          </> : null
      }
      
      
    </div>
  )
}

export default ChatPage
