// import React from 'react'
import Messages from './Messages'

const ChatPage = () => {
  return (
    <div className='flex flex-col justify-between h-[100vh]'>
      <div className='h-[100%] overflow-y-scroll'>
        <Messages />
        <Messages own={ true} />
        <Messages />
        <Messages />
        <Messages />
        <Messages own={ true} />
        <Messages own={ true} />
        <Messages own={ true} />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages own={ true} />
        <Messages own={ true} />
        <Messages />
        <Messages />
      </div>
      <div className='flex items-center my-2'>
        <textarea placeholder='Message' className='bg-gray-400 px-2 border-2 outline-none w-[100%] font-normal bg-transparent'/>
        <button className='ml-2 py-2 px-6 bg-blue-400 rounded'>Send</button>
      </div>
    </div>
  )
}

export default ChatPage
