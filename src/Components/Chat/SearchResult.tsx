import {FC} from 'react'
import { IUser } from '../../Types/UsersTypes'
import axios from 'axios'

const SearchResult: FC<IUser> = ({_id,userName }) => {
  const user_token = localStorage.getItem("auth_Token")
  
  console.log(_id)
  const createRoom = async () => {
    const config = {
      authorization: `Bearer ${user_token}`,
    };
    const receiverId = _id
    console.log(receiverId)
    await axios.post('http://localhost:1000/api/coversation/create', { receiverId }, { headers: config }).then((res) => {
      console.log(res.data.status);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div className='flex justify-between mb-2'>
          <div className='flex justify-center items-center'>
              <div className='w-10 h-10 bg-yellow-400 rounded-[50%] flex justify-center items-center'>
                  <div className='text-white font-bold text-[20px]'>{userName?.charAt(0).toUpperCase() }</div>
              </div>
              <p className='ml-3 text-lg font-bold'>{userName}</p>
        </div>
      <button
        className='border-black border-2 p-1 rounded text-sm font-bold hover:bg-black hover:text-white ;'
        onClick={ createRoom }
      >Create Room</button>
    </div>
  )
}

export default SearchResult
