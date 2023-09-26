import React from 'react'
import "../../Global_Style.css"
import {ChatMessage} from "../../Types/Auth/Types"

const Messages: React.FC<ChatMessage> = ({message, own}) => {
  return (
    <div className="flex flex-col">
      <div className={`flex ${own ? "justify-end" : null}`}>
        <div className={`${own? "bg-gray-300 text-black" : "bg-blue-500 text-white"} rounded-md mt-3 max-w-lg`}>
          <div className="text-sm p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
    </div>
    </div>
  )
}

export default Messages
