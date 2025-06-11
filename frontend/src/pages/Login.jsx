import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
  const { navigate , token, api_url, setToken } = useContext(ShopContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currState === 'Sign up') {

        const response = await axios.post(api_url + '/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully')
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(api_url + '/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          toast.success('Sign in successful')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  useEffect(() => {
    if (token ) {
      navigate('/')
    } else {
      
    }  
  
  }, [token])
  


  const [currState, setCurrState] = useState("Login")
  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prate-regular text-3xl '>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      {currState === 'Sign up' && <input onChange={(e) => setName(e.target.value)} value={name} required type='text' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' />
      }<input onChange={(e) => setEmail(e.target.value)} value={email} required type='text' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} required type='password' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px] '>

        <p className='cursor-pointer '>Forgot your password? </p>
        {
          currState === 'Login' ?
            <p onClick={() => setCurrState("Sign up")} className='cursor-pointer '>Create account </p> :
            <p onClick={() => setCurrState("Login")} className='cursor-pointer '>Login here </p>
        }

      </div>

      <button


        type='submit'
        className='bg-black text-white text-right font-light px-8 py-2 mt-4'>
        {currState === 'Login' ? "Sign in" : "Sign up"}
      </button>
    </form>
  )
}

export default Login