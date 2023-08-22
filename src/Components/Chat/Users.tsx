import React from 'react'

const Users = () => {
  return (
      <div className='flex m-3'>
          <div className='w-12 bg-blue-400 rounded-[50%] mr-3 flex align-center'><span className='font-bold text-lg'>D</span></div>
          <div className='flex justify-between w-[95%]'>
            <div>
              <p className='font-bold'>David User</p>
              <span>last seen</span>
        </div>
        <span className='text-sm font-medium'>4:26pm</span>
          </div>
    </div>
  )
}

export default Users