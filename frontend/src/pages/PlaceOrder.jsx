import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [paymentMethod, setpaymentMethod] = useState("cod")
  const {navigate } = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt14 min-h-[80vh] border-t'>

      {/*Left side*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />

          <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>
        <input type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        <div className="flex gap-3">
          <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />

          <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />

          <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />

      </div>
      {/*Right side*/}
      <div className=" mt-8">
        <div className="min-w-80 mt-8">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"method"} />

        </div>

        <div className="flex gap-3 flex-col lg:flex-row ">
          <div onClick={()=>setpaymentMethod('stripe')} className="flex items-center gap-3  p-2 px-3 cursor-pointer bg-gray-100 ">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "stripe" ? "bg-gray-400" : ""} `}></p>
            <img src={assets.stripe_logo} className='h-5  mx-4' alt="" />
          </div>
          
          <div onClick={()=>setpaymentMethod('razorpay')} className="flex items-center gap-3  p-2 px-3 cursor-pointer bg-gray-100 ">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "razorpay" ? "bg-gray-400" : ""} `}></p>
            <img src={assets.razorpay_logo} className='h-5  mx-4' alt="" />
          </div>
          
          <div onClick={()=>setpaymentMethod('cod')} className="flex items-center gap-3  p-2 px-3 cursor-pointer bg-gray-100 ">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "cod" ? "bg-gray-400" : ""} `}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">Cash on Delivery</p>    </div>
        </div>
        <div className='w-full text-end mt-8'>
        <button onClick={()=>navigate("/orders")} className='bg-black text-white px-16 py-3 text-sm'>
          Place order
        </button>

      </div>
      </div>

      

    </div>

  )
}

export default PlaceOrder