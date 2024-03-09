import { useEffect, useState } from 'react'
import "../../Global_Style.css"
import { IUser, userApi } from '../../Types/UsersTypes'
import axios from 'axios'

const Users = ({conversation, setcurrentChat}: userApi) => {
  const [friend, setFriend] = useState<IUser>()
  const [user, setUser] = useState<IUser>()

  const user_token = localStorage.getItem("auth_Token")

  // console.log(friend)
  const getCurrentUser = async () => {
    const config = {
        authorization: `Bearer ${user_token}`,
    };
    await axios.get("http://localhost:1000/api/user/single_user", { headers: config }).then((res) => {
        setUser(res.data.data)
    }).catch((error) => {
        throw error.message
    })
}

  useEffect(() => {
    getCurrentUser()
    const friendId = conversation?.members?.find((el) => el !== user?._id)
    const getUser = async () => {
      await axios.get("http://localhost:1000/api/user?userId=" + friendId).then((res) => {
        setFriend(res.data.data)
      }).catch((error) => {
        throw error
        })
    }
    getUser()
  },[conversation,user])
  return (
    <div>
        <div className='flex m-3 cursor-pointer' onClick={()=> setcurrentChat(conversation)}>
          <div className='w-12 bg-blue-400 rounded-[50%] mr-3 display'><span className='font-bold text-lg'> {friend?.userName.charAt(0)?.toUpperCase()}</span></div>
          <div className='flex justify-between w-[95%]'>
            <div>
              <p className='font-bold'> {friend?.userName}</p>
              <span>online</span>
        </div>
        <span className='text-sm font-medium'>4:26pm</span>
          </div>
      </div>
      </div>
  )
}

export default Users
