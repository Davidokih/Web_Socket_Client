import React from 'react'
import { InputNames } from '../../Types/Auth/Types'

const Input:React.FC<InputNames> = ({nameOfInput,name,handleChange,errors}) => {
  return (
    <div className="w-[100%] mb-3">
      <div className="font-bold font-poppings mb-1">{ nameOfInput}</div>
      <input className='border-red-400 px-2 border-b-2 outline-none w-[100%] h-10 font-normal bg-transparent' placeholder={ nameOfInput } name={ name } onChange={ handleChange } />
      {errors && <div className='text-red-600 text-sm'>{errors}</div>}
    </div>
  )
}

export default Input