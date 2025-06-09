import { v2 as cloudinary } from 'cloudinary'
import { json } from 'express'
import productModel from '../models/productModel.js'

// function for adding a product 
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item => item !== undefined))
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        // ...existing code...
        let parsedSizes = [];
        if (sizes) {
            try {
                parsedSizes = JSON.parse(sizes);
            } catch (e) {
                return res.json({ success: false, message: "Invalid sizes format" });
            }
        }

        const productData = {
            name,
            category,
            description,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        }
        // ...existing code...
        const product = new productModel(productData)
        product.save()

        res.json({ success: true, message: "Product added successfully" })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

// function for removing a product 
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true, message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

// function for listing all products 
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

// function for displaying a product's detail
const productDetail = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({
            success: true, product
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}


export { listProducts, addProduct, productDetail, removeProduct }