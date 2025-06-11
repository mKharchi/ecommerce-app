import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
const Orders = ({ token }) => {


  const [orders, setOrders] = useState([])
  const fetchOrders = async () => {
    if (token) {
      try {
        const res = await axios.post(backendUrl + '/order/list', {}, { headers: { token } })
        if (res.data.success) {
          setOrders(res.data.orders.reverse());
        } else {
          toast.error(res.data.message)
        }

      } catch (error) {
        toast.error(error.message)

      }
    } else { return null }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatus = async (e, orderId) => {
    try {
      const res = await axios.post(backendUrl + '/order/status', { orderId, status: e.target.value }, { headers: { token } })
      if (!res.data.success) {
        toast.error(res.data.message)

      } else {
        await fetchOrders()
      }

    } catch (error) {

    }
  }

  return (
    <div>
      <h3 className="">Order Page</h3>
      <div className="">
        {
          orders.map((el, index) => (
            <div className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 `} key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />

              <div>
                <div>
                  {
                    el.items.map((item, i) => {
                      if (i === el.items.length - 1) {
                        return <p className='py-0.5' key={i}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                      } else {
                        return <p className='py-0.5' key={i}>{item.name} x {item.quantity} <span> {item.size} ,</span></p>
                      }
                    })}
                </div>

                <p className='mt-3 mb-2 font-medium'>
                  {el.address.firstName + " " + el.address.lastName}
                </p>
                <div>
                  <p >{el.address.street + " ,"}</p>
                  <p>{el.address.city + ", " + el.address.state + ", " + el.address.country + ", " + el.address.zipCode}</p>

                  <p>{el.address.phone}</p>
                </div>


              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>{"Items: " + el.items.length}</p>
                <p className='mt-3'>Method: {el.paymentMethod}</p>
                <p>Payment: {el.payment ? 'Done' : "Pending"} </p>
                <p>Date: {new Date(el.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>
                {currency} {el.amount}
              </p>

              <select onChange={(e)=>handleStatus(e , el._id)} value={el.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shiped">Shiped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>))
        }
      </div>
    </div>
  )
}

export default Orders
