import React,{useEffect,useState} from 'react'
import { ChatPage, Users } from '../../Components'
import "../../Global_Style.css"
import axios from 'axios'

const Chats = () => {

  // const [getUsers, setGetUsers] = useState([])
  const [user, setUser] = useState()
  const [conversation, setConversation] = useState([])
  const [currentChat, setcurrentChat] = useState(null)
  const [messages, setMessages] = useState([])

  // const getUsersApi = () => {
  //   axios.get("http://localhost:1000/api/user/").then((res) => {
  //     setGetUsers(res.data.data)
  //   })
  // }

  const user_token = localStorage.getItem("auth_Token")
  // console.log(user_token)
  const getConversation = async () => {
    const config = {
      "Authorization": `Bearer ${user_token}`
    }
    try {
      const res = await axios.get("http://localhost:1000/api/coversation", { headers: config })
      setConversation(res.data.data)
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
    const getUser = async () => {
        const config = {
            authorization: `Bearer ${user_token}`,
        };
        await axios.get("http://localhost:1000/api/user/single_user", { headers: config }).then((res) => {
            setUser(res.data.data)
        }).catch((error) => {
            // alert("User Token as Expire")
            console.log(error.message);
        })
    }
  useEffect(() => {
    getConversation()
    // getUsersApi()
    getUser()
  }, [])
  
  return (
      <div className='w-[100%] flex align-center justify-center'>
      <div className='bg-gray-400 w-[35%] overflow-y-auto'>
        { conversation?.map((props) => (
          <Users conversation={ props } user={ user} setcurrentChat={ setcurrentChat}/>
        ))}
      </div>
      <div className='chat-flex ml-3'> <ChatPage currentChat={ currentChat } user={ user } /></div>
    </div>
  )
}

export default Chats