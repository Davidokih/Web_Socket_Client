import { useEffect, useState } from 'react'
import Messages from './Messages'
import axios from 'axios'
import { Conversation, IMessages,ISocket } from '../../Types/UsersTypes'
import {io} from 'socket.io-client'


const ENDPOINT = 'http://localhost:1000'
var socket, selectedChatCompare
const ChatPage = ({ currentChat, user }: Conversation) => {
  
  const [messages, setMessages] = useState<Array<IMessages>>([])
  const [message, setMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [socketUser, setSocketUser] = useState()
  const user_token = localStorage.getItem("auth_Token")

  const get_messages = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    await axios.get("http://localhost:1000/api/message/" + currentChat?._id, { headers: config }).then((res) => {
      setMessages(res.data.data)
      socket.emit('join chat', currentChat?._id)
    }).catch((error) => {
      console.log(error);
    })
  }
  // console.log(currentChat);

  const sendMessage = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    // const recieverId = currentChat.members.find((el)=> el !==user._id)
    await axios.post("http://localhost:1000/api/message/create", { message: message, conversationId: currentChat?._id }, { headers: config }).then((res) => {
      socket.emit('new message', {newMessageRecieved: res.data.data, currentChat:currentChat})
      setMessage("")
      setMessages([...messages,res.data.data])
    }).catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user?._id)
    socket.on('connection',()=> setSocketConnected(true))
  }, [])
  
  useEffect(() => {
    get_messages()
    selectedChatCompare = currentChat
  }, [currentChat])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved:ISocket) => {
      console.log(newMessageRecieved)
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved?._id) {
        //give notification
        console.log(newMessageRecieved)
      } else {
        setMessage([...message, newMessageRecieved])
        console.log(newMessageRecieved)
      }
    })
  })
  return (
    <div className='flex flex-col justify-between h-[100vh]'>
      {
        currentChat  === null? 
          null : <>
          <div className='h-[100%] overflow-y-auto'>
            { messages?.map((props) => (
             <Messages message={props} own={ props.sendeId === user?._id} />
           ))}
          </div>
          <div className='flex items-center my-2'>
              <textarea placeholder='Message' className='bg-gray-400 px-2 border-2 outline-none w-[100%] font-normal bg-transparent' onChange={ (e) => {
              setMessage(e.target.value)
            }}/>
            <button className='ml-2 py-2 px-6 bg-blue-400 rounded' onClick={sendMessage}>Send</button>
          </div>
        </>
      }
      
      
    </div>
  )
}

export default ChatPage
