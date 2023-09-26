import React, { useEffect, useState } from 'react'
import "../../Global_Style.css"
import { userApi } from '../../Types/UsersTypes'
import axios from 'axios'

const Users: React.FC<userApi> = ({ conversation, setcurrentChat, user }) => {
  const [friend, setFriend] = useState()

  useEffect(() => {
    const friendId = conversation?.members?.find((el) => el !== user._id)
    
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/user?userId=" + friendId)
        setFriend(res.data.data)

      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  },[conversation, user])
  return (
    <div>
        <div className='flex m-3 cursor-pointer' onClick={()=> setcurrentChat(conversation)}>
          <div className='w-12 bg-blue-400 rounded-[50%] mr-3 display'><span className='font-bold text-lg'> {friend?.userName.charAt(0)?.toUpperCase()}</span></div>
          <div className='flex justify-between w-[95%]'>
            <div>
              <p className='font-bold'> {friend?.userName}</p>
              <span>last seen</span>
        </div>
        <span className='text-sm font-medium'>4:26pm</span>
          </div>
      </div>
      </div>
  )
}

export default Users
