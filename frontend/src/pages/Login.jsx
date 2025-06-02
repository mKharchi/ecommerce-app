import React, { useState } from 'react'

const Login = () => {

  const onSubmit = async (e) => {
    e.preventDefault()

  }
  const [currState, setCurrState] = useState("Login")
  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prate-regular text-3xl '>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      {currState === 'Sign up' && <input required type='text' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' />
      }<input required type='text' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email' />
      <input required type='password' className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' />
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