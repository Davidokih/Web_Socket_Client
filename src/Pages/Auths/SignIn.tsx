import React from 'react'
import { Input } from "../../Components"
import { NavLink } from 'react-router-dom'

const SignIn = () => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone_No, setPhone_No] = React.useState("")
  const [password, setPassword] = React.useState("")
  // console.log(name)
  return (
    <div className='w-[100%] flex justify-center align-center p-10'>
      <form className="w-[100%] max-w-md flex align-center justify-center h-[550px] bg-gray-300
    p-5 flex-col">
        <h3 className="font-bold text-center mb-10 text-lg">Create Account</h3>
        <Input inputValue={name } nameOfInput="User Name" setEmail={ setName} />
        <Input inputValue={ email } nameOfInput="Email" setEmail={ setEmail} />
        <Input inputValue={ phone_No } nameOfInput="Phone Number" setEmail={ setPhone_No} />
        <Input inputValue={ password } nameOfInput="Password" setEmail={ setPassword } />
        <button className='text-white bg-black py-2 rounded-md font-bold mt-5' type='submit'>Sign Up</button>
        <p className='text-center mt-3 font-'>Already have an account <NavLink to="/signup"><span className='font-bold text-blue-500 cursor-pointer'>Sign Up</span></NavLink></p>
      </form>
    </div>
  )
}

export default SignIn