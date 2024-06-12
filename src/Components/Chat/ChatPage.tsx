import { ChangeEvent, useEffect, useState } from 'react'
import Messages from './Messages'
import axios from 'axios'
import { Conversation, IMessages,IConversation } from '../../Types/UsersTypes'
import {io} from 'socket.io-client'


const ENDPOINT = 'http://localhost:1000'
let socket, selectedChatCompare: IConversation | undefined
const ChatPage = ({ currentChat, user }: Conversation) => {
  
  const [messages, setMessages] = useState<Array<IMessages>>([])
  const [message, setMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const user_token = localStorage.getItem("auth_Token")

  const get_messages = async () => {
    const config = {
      authorization: `Bearer ${ user_token }`
    }

    await axios.get(ENDPOINT + "/api/message/" + currentChat?._id, { headers: config }).then((res) => {
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

    socket.emit('stop typing',  currentChat?._id)
    // const recieverId = currentChat.members.find((el)=> el !==user._id)
    await axios.post(ENDPOINT + "/api/message/create", { message: message, conversationId: currentChat?._id }, { headers: config }).then((res) => {
      socket.emit('new message', res.data.data)
      setMessage("")
      setMessages([...messages,res.data.data])
    }).catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user?._id)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing',()=>setIsTyping(true))
    socket.on('stop typing',()=>setTyping(true))
  }, [])
  
  useEffect(() => {
    get_messages()
    selectedChatCompare = currentChat
  }, [currentChat])

  // console.log(selectedChatCompare)
  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved:IMessages) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved?.conversationId) {
        //give notification
        console.log(newMessageRecieved)
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })

  const typingHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (!socketConnected) return
    if (!typing) {
      setTyping(true)
      socket.emit('typing', currentChat?._id)
    }

    const lastTypingTime = new Date().getTime()
    const timeLength = 3000

    setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeLength && typing) {
        socket.emit('stop typing', currentChat?._id)
        setTyping(false)
      }
    }, timeLength)
  }

  console.log(typing, isTyping)
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
              {isTyping ? <div>Loading...</div> : <></>}
              <textarea placeholder='Message' className='bg-gray-400 px-2 border-2 outline-none w-[100%] font-normal bg-transparent' onChange={typingHandler }/>
            <button className='ml-2 py-2 px-6 bg-blue-400 rounded' onClick={sendMessage}>Send</button>
          </div>
        </>
      }
      
      
    </div>
  )
}

export default ChatPage
