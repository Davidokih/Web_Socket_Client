import {useEffect,useState} from 'react'
import { ChatPage, Users, SearchResult } from '../../Components'
import "../../Global_Style.css"
import axios from 'axios'
import { IConversation, IUser } from '../../Types/UsersTypes'

const Chats = () => {

  const [getUsers, setGetUsers] = useState<Array<IUser>>([])
  const [user, setUser] = useState<IUser>()
  const [conversation, setConversation] = useState([])
  const [currentChat, setcurrentChat] = useState<IConversation| null>(null)
  const [query, setQuery] = useState("")
  // const [messages, setMessages] = useState([])

  const getUsersApi = () => {
    axios.get("http://localhost:1000/api/user/all").then((res) => {
      setGetUsers(res.data.data)
    }).catch((err) => {
      console.log(err.message);
    })
  }

  // console.log(currentChat);
  const keys:(keyof IUser)[] = ["userName"]
  const search = (e:IUser[] | undefined) => {
    const result = e?.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return typeof value === "string" && value.toLowerCase().includes(query);
      })
    );
    return query ? (result?.length ? result : null) : null
  }

  const searchData: IUser[] | null  = search(getUsers)
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
            { searchData?.map((props: IUser) => (
              <div className='px-2 py-3 max-h-40 overflow-y-auto' onClick={ () => {
                setQuery('')
                setUser(props)
              } }><SearchResult _id={ props._id } userName={ props.userName} /></div>
            ))}
          </div>
        </div>
        { conversation?.map((props) => (
          <Users conversation={ props } setcurrentChat={ setcurrentChat}/>
        ))}
      </div>
      <div className='chat-flex ml-3'> <ChatPage currentChat={ currentChat } user={ user } /></div>
    </div>
  )
}

export default Chats