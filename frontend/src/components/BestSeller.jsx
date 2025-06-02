import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const best = products.filter((item) => (item.bestseller))
        setBestSeller(best.slice(0, 5))

    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'

            >
                <Title text1={"Best"} text2={"Seller"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam nemo, reprehenderit optio totam ipsum perspiciatis vitae rem quisquam? Optio libero quam illum eveniet dignissimos nesciunt harum earum, ab quis praesentium.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((el , index)=><ProductItem key={index} id={el.id} name={el.name} image={el.image} price={
                    el.price
                } />)}
            </div>

        </div>
    )
}

export default BestSeller