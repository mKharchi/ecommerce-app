import validator from 'validator'
import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//route for user login
const loginUser = async (req, res) => {


    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })


        if (!user) {
            return res.json({
                success: false,
                message: "No user available with this email."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {

            return res.json({
                success: false,
                message: "Ivalid credentials."
            })
        } else {

            const token = createToken(user._id)

            return res.json({
                success: true,
                token
            })


        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //checking user already existing

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({
                success: false,
                message: "user already exists."
            })
        }

        // validating email format and passwrd strength
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please provide a valid email."
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please provide a strong password."
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        const newUser = userModel({
            name, email, password: hashedpassword
        })

        const user = await newUser.save()


        const token = createToken(user._id)
        res.json({
            success: true, token
        })




    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

//route for admin login
const loginAdmin = async (req, res) => {
try {
    
    const { email , password} = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
        
        const token = jwt.sign(email+password , process.env.JWT_SECRET)
        res.json({
            success:true , token
        })


    }else{
        res.json({
            success:false , message:"invalid credentials"
        })

    }
} catch (error) {
    
}
}




export { loginUser, registerUser, loginAdmin }