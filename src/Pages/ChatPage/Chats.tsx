import React,{useEffect,useState} from 'react'
import { ChatPage, Users, SearchResult } from '../../Components'
import "../../Global_Style.css"
import axios from 'axios'

const Chats = () => {

  const [getUsers, setGetUsers] = useState([])
  const [user, setUser] = useState()
  const [conversation, setConversation] = useState([])
  const [currentChat, setcurrentChat] = useState(null)
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState([])

  const getUsersApi = () => {
    axios.get("http://localhost:1000/api/user/all").then((res) => {
      setGetUsers(res.data.data)
    }).catch((err) => {
      console.log(err.message);
    })
  }

  // console.log(getUsers);
  const keys = ["userName"]
  const search = (e: any) => {
    const result = e?.filter((item: any) =>
   keys.some((key) => {
      const value = item[key];
      return typeof value === "string" && value.toLowerCase().includes(query);
    })
  );
  return query ? (result?.length ? result : null) : null
  }

  const searchData  = search(getUsers)
  const user_token = localStorage.getItem("auth_Token")
  // console.log(user)
  const getConversation = async () => {
    const config = {
      "Authorization": `Bearer ${user_token}`
    }
    try {
      const res = await axios.get("http://localhost:1000/api/coversation", { headers: config })
      setConversation(res.data.data)
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
    getUsersApi()
    getUser()
  }, [])
  
  return (
      <div className='w-[100%] flex align-center justify-center'>
      <div className='bg-gray-400 w-[35%] overflow-y-auto'>
        <div className='flex justify-center items-center flex-col'>
          <input className='mt-3 px-1 w-[90%] h-9 rounded outline-none' placeholder='Search' value={ query } onChange={ (e) => setQuery(e.target.value) } />
          <div className='w-[90%] bg-white mt-3 rounded px-1'>
            { searchData?.map((props: any) => (
              <div className='' onClick={ () => {
                setQuery('')
                setUser(props)
              } }><SearchResult user='David DevUos' createRoom={ ()=>"hello"} /></div>
            ))}
          </div>
        </div>
        { conversation?.map((props) => (
          <Users conversation={ props } user={ user} setcurrentChat={ setcurrentChat}/>
        ))}
      </div>
      <div className='chat-flex ml-3'> <ChatPage currentChat={ currentChat } user={ user } /></div>
    </div>
  )
}

export default Chats