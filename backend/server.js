import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudnary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


// app config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()



// middlewares

app.use(express.json())
app.use(cors())


// api endpoints

app.get('/', (req, res) => {
    res.send("API WORKING")
})
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)




app.listen(port, () => {
    console.log("server started on port " + port);

})
