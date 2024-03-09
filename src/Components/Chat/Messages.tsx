import React from 'react'
import "../../Global_Style.css"
import {ChatMessage} from "../../Types/UsersTypes"

const Messages: React.FC<ChatMessage> = ({ message, own }) => {
  // console.log(message)
  return (
    <div className="flex flex-col">
      <div className={`flex ${own ? "justify-end" : null}`}>
        <div className={`${own? "bg-gray-300 text-black" : "bg-blue-500 text-white"} rounded-md mt-3 max-w-lg p-2`}>
          <div className="text-md font-medium">{ message?.message }</div>
          <div className='text-xs text-right ml-10'>1:30pm</div>
        </div>
    </div>
    </div>
  )
}

export default Messages
