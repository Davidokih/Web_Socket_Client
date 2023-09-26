import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import axios from 'axios'
import { Conversation } from '../../Types/UsersTypes'
// import { userContext } from '../../GlobalState/Global'

const ChatPage:React.FC<Conversation> = ({currentChat,user}) => {

  // const val = useContext(userContext)
  const [messages, setMessages] = useState()
  const user_token = localStorage.getItem("auth_Token")

  const get_messages = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    await axios.get("http://localhost:1000/api/message", { headers: config }).then((res) => {
      setMessages(res.data.data)
      console.log(res.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }
  console.log(currentChat);

  const sendMessage = async () => {
    
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
              <textarea placeholder='Message' className='bg-gray-400 px-2 border-2 outline-none w-[100%] font-normal bg-transparent'/>
              <button className='ml-2 py-2 px-6 bg-blue-400 rounded'>Send</button>
            </div>
          </> : null
      }
      
      
    </div>
  )
}

export default ChatPage
