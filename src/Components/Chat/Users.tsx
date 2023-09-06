import React from 'react'
import "../../Global_Style.css"
import { userApi } from '../../Types/UsersTypes'

const Users: React.FC<userApi> = ({getUsers}) => {
  return (
    <div>
      { getUsers?.map((props) => (
        <div className='flex m-3' key={props?._id}>
          <div className='w-12 bg-blue-400 rounded-[50%] mr-3 display'><span className='font-bold text-lg'>{ props?.userName.charAt(0)?.toUpperCase()}</span></div>
          <div className='flex justify-between w-[95%]'>
            <div>
              <p className='font-bold'>{ props?.userName}</p>
              <span>last seen</span>
        </div>
        <span className='text-sm font-medium'>4:26pm</span>
          </div>
      </div>
      ))}
      </div>
  )
}

export default Users
