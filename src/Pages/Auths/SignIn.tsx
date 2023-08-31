// import React from 'react'
import { Input } from "../../Components"
import { NavLink,useNavigate } from 'react-router-dom'
import useForm from "../../Error/useForm"
import axios from 'axios'

  
const SignIn = () => {

  const navigate = useNavigate()
  const { handleChange, values, errors } = useForm()
  const formLogin = async () => {
    await axios.post("http://localhost:1000/api/user/signin", values).then((res) => {
      // console.log(res)
      localStorage.setItem("auth_Token", res?.data.data)
      navigate("/chat_interface")
    }).catch((error) => {
      console.log(error);
    })
   }
  const handleSubmit = async (event: any) => {

    if(event) event.preventDefault();
    
    if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
      formLogin();
    }else{
        alert("There is an Error!");
    }
  }
  // console.log(errors)
  return (
    <div className='w-[100%] flex justify-center align-center p-10'>
      <form onSubmit={handleSubmit} className="w-[100%] max-w-md flex align-center justify-center h-[550px] bg-gray-300
    p-5 flex-col">
        <h3 className="font-bold text-center mb-10 text-lg">Sign In User</h3>
        <Input nameOfInput="Email" name="email" handleChange={handleChange } errors={errors?.email}/>
        <Input nameOfInput="Password" name="password" handleChange={handleChange } errors={errors?.password}/>
        <button className='text-white bg-black py-2 rounded-md font-bold mt-5' type='submit'>Sign In</button>
        <p className='text-center mt-3 font-'>Don't have an account <NavLink to="/signup"><span className='font-bold text-blue-500 cursor-pointer'>Sign Up</span></NavLink></p>
      </form>
    </div>
  )
}

export default SignIn