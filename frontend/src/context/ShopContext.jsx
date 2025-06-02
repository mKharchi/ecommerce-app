import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {  useNavigate } from 'react-router-dom'
export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [count, setCount] = useState(0)
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems)
        if (!size) {

            toast.error("Select A size for the product")
            return;
        }
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]++;
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1

        }
        setCartItems(cartData)
    }
    const getCartCount = () => {
        let total = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        total += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return total
    }
    const updateQuantity = async (itemId, size, quantity) => {
        let cartdata = structuredClone(cartItems)

        cartdata[itemId][size] = quantity
        setCartItems(cartdata)

    }



    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            let item = products.find(pro => pro._id === items)

            for (const ite in cartItems[items]) {
                if (cartItems[items][ite] > 0) {
                    total += item.price * cartItems[items][ite]
                }
            }
        }

        return total
    }
    useEffect(() => {
        setCount(getCartCount())
    }, [cartItems])

    const value = {
        products, currency, delivery_fee , navigate
        , search, setSearch, getCartAmount
        , showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, count, updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
