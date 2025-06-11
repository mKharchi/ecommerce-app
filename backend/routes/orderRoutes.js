import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import {  placeOrder, allOrders,  placeOrderStripe, updateOrderStatus, userOrders, verifyStripe  } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()
//admin features
orderRouter.post('/list' , adminAuth , allOrders)
orderRouter.post('/status' , adminAuth , updateOrderStatus)
//orders features
orderRouter.post('/place' , authUser , placeOrder)
orderRouter.post('/stripe' , authUser , placeOrderStripe)
//user features
orderRouter.post('/userOrders' , authUser , userOrders)
//verify payment
orderRouter.post('/verifyStripe' , authUser ,verifyStripe)


export default orderRouter