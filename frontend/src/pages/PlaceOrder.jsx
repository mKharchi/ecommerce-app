import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const { navigate, api_url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(el => el._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)


            }
          }
        }


      }
      let orderdata = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,

      }
      switch (paymentMethod) {
        case 'cod':
          const response = await axios.post(api_url + '/order/place', orderdata, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            toast.success(response.data.message)
            navigate("/orders")
          } else {
            toast.error(response.data.message
            )
          }
          break;
        case 'stripe':
          const response_str = await axios.post(api_url + '/order/stripe', orderdata, { headers: { token } })
          if (response_str.data.success) {
            const { session_url } = response_str.data
            window.location.replace(session_url)
          } else {
            toast.error(response_str.data.message)
          }
          break;

        default:

          break;
      }



    } catch (error) {
      console.log(error);

      toast.error(error.message)


    }

  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            name='firstName'
            value={formData.firstName}
            type="text"
            placeholder='First name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input required
            onChange={handleChange}
            name='lastName'
            value={formData.lastName}
            type="text"
            placeholder='Last name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>

        <input required
          onChange={handleChange}
          name='email'
          value={formData.email}
          type="email"
          placeholder='Email address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

        <input required
          onChange={handleChange}
          name='street'
          value={formData.street}
          type="text"
          placeholder='Street'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

        <div className="flex gap-3">
          <input required
            onChange={handleChange}
            name='city'
            value={formData.city}
            type="text"
            placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input required
            onChange={handleChange}
            name='state'
            value={formData.state}
            type="text"
            placeholder='State'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>

        <div className="flex gap-3">
          <input required
            onChange={handleChange}
            name='zipCode'
            value={formData.zipCode}
            type="text"
            placeholder='Zip Code'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input required
            onChange={handleChange}
            name='country'
            value={formData.country}
            type="text"
            placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>

        <input
          onChange={handleChange}
          name='phone'
          value={formData.phone}
          type="tel"
          placeholder='Phone'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />
      </div>

      {/* Right side - Payment and Summary */}
      <div className="mt-8 w-full sm:max-w-[480px]">
        <div className="min-w-80 mt-8">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} text2={"method"} />
        </div>

        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={() => setPaymentMethod('stripe')} className="flex items-center gap-3 p-2 px-3 cursor-pointer bg-gray-100">
            <div className={`w-3.5 h-3.5 border rounded-full ${paymentMethod === "stripe" ? "bg-gray-400" : ""}`} />
            <img src={assets.stripe_logo} className='h-5 mx-4' alt="Stripe" />
          </div>

          

          <div onClick={() => setPaymentMethod('cod')} className="flex items-center gap-3 p-2 px-3 cursor-pointer bg-gray-100">
            <div className={`w-3.5 h-3.5 border rounded-full ${paymentMethod === "cod" ? "bg-gray-400" : ""}`} />
            <p className="text-gray-500 text-sm font-medium mx-4">Cash on Delivery</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type="submit" className='bg-black text-white px-16 py-3 text-sm'>
            Place order
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
