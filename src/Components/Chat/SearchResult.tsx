import React from 'react'
import { SearchFunc } from '../../Types/UsersTypes'

const SearchResult: React.FC<SearchFunc> = ({user="David DevUps", createRoom}) => {
  return (
    <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
              <div className='w-10 h-10 bg-yellow-400 rounded-[50%] flex justify-center items-center'>
                  <div className='text-white font-bold text-[20px]'>{ user.charAt(0).toUpperCase() }</div>
              </div>
              <p className='ml-3'>{user}</p>
        </div>
        <button className='border-black border-2 p-2 rounded hover:bg-black hover:text-white 
        ;' onClick={()=>createRoom}>Create Room</button>
    </div>
  )
}

export default SearchResult
