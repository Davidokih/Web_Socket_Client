import React from 'react'
import { Input } from "../../Components"
import { NavLink,useNavigate } from 'react-router-dom'
import useForm from "../../Error/useForm"
import axios from 'axios'

const SignUp = () => {

  const navigate = useNavigate()
  const formLogin = () => {
    console.log("Callback function when form is submitted!");
   }
  const { handleChange, values, errors } = useForm()
  const handleSubmit = async (event: any) => {

    if(event) event.preventDefault();
    await axios.post("http://localhost:1000/api/user/signup", values).then(() => {
      navigate("/signin")
    }).catch((error) => {
      console.log(error);
    })
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
        <h3 className="font-bold text-center mb-10 text-lg">Create Account</h3>
        <Input nameOfInput="User Name" name="userName" handleChange={ handleChange } errors={ errors.userName } />
        
        <Input nameOfInput="Email" name="email" handleChange={handleChange } errors={errors.email}/>
        <Input nameOfInput="Phone Number" name="phone_No" handleChange={handleChange } errors={errors.phone_No}/>
        <Input nameOfInput="Password" name="password" handleChange={handleChange } errors={errors.password}/>
        <button className='text-white bg-black py-2 rounded-md font-bold mt-5' type='submit'>Sign Up</button>
        <p className='text-center mt-3 font-'>Already have an account <NavLink to="/signin"><span className='font-bold text-blue-500 cursor-pointer'>Sign In</span></NavLink></p>
      </form>
    </div>
  )
}

export default SignUp