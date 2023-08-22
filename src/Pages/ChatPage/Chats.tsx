import React from 'react'
import { ChatPage, Users } from '../../Components'
import "../../Global_Style.css"

const Chats = () => {
  return (
      <div className='w-[100%] flex align-center justify-center h-[100vh]'>
          <div className='bg-gray-400 w-[60%] overflow-y-auto'><Users /></div>
         <div className='w-[100%]'> <ChatPage /></div>
    </div>
  )
}

export default Chats