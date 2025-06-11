import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10
    const api_url = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState("")

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
        if (token) {
            try {
                const res = await axios.post(api_url + '/cart/add', {
                    itemId, size
                }, { headers: { token } })

                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
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
                    console.log(error);

                    toast.error(error.message)

                }
            }
        }
        return total
    }
    const updateQuantity = async (itemId, size, quantity) => {
        let cartdata = structuredClone(cartItems)

        cartdata[itemId][size] = quantity
        setCartItems(cartdata)

        if (token) {
            try {
                await axios.post(api_url + '/cart/update', {
                    itemId, size, quantity
                }, { headers: { token } })
            } catch (error) {
                console.log(error);

                toast.error(error.message)

            }
        }

    }



    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            let item = products.find(pro => pro._id === items)
            if (!item) continue; // Skip if product not found

            for (const ite in cartItems[items]) {
                if (cartItems[items][ite] > 0) {
                    total += item.price * cartItems[items][ite]
                }
            }
        }
        return total
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(api_url + '/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                console.log(response.data.cartData);
                
                setCartItems(response.data.cartData)

            }
        } catch (error) {
            console.log(error);

            toast.error(error.message)

        }
    }
    useEffect(() => {
        setCount(getCartCount())
    }, [cartItems])

    const getProductData = async () => {
        try {

            const response = await axios.get(api_url + '/product/all')
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            toast.error(error.message)

        }
    }


    useEffect(() => {
        getProductData()
    }, [])


    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        api_url, setCartItems,
        products, currency, delivery_fee, navigate
        , search, setSearch, getCartAmount
        , showSearch, setShowSearch, setCount,
        cartItems, addToCart, getCartCount,
        count, updateQuantity, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
