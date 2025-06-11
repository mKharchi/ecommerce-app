import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'


//global variable
const delivery_charges = 10
const currency = 'eur'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// cod method orders 
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body


        const orderData = {
            userId
            , items
            , amount
            , paymentMethod: "COD"
            , payment: false
            , address
            , date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        return res.json({ success: true, message: 'Order placed' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


// gateway initialise

// stripe method orders 
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId
            , items
            , amount
            , paymentMethod: "Stripe"
            , payment: false
            , address
            , date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100

            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: delivery_charges * 100

            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',

        })
        return res.json({ success: true, session_url: session.url })




    } catch (error) {
        res.json({ success: false, message: error.message })

    }


}

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })

            res.json({ success: true })

        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false  })

        }
    } catch (error) {
            res.json({ success: false , message:error.message  })

    }
}



// display orders 


const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })


    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}
// display orders of a user


const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}



//update order status


const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        return res.json({
            success: true, message: 'Status updated'
        })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export { verifyStripe ,placeOrder, allOrders,  placeOrderStripe, updateOrderStatus, userOrders }