import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import Title from "./Title"
import ProductItem from "./ProductItem"
const Relatedproduct = ({ category, subcategory }) => {

    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])
    useEffect(() => {
        if (products.length > 0) {
            let copyOfP = products.slice()
            copyOfP = copyOfP.filter(el => category === el.category)
            copyOfP = copyOfP.filter(el => subcategory === el.subCategory)
            setRelated(copyOfP.slice(0 , 5))

        }
    }, [products])
    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Title text1={"Related"} text2={"Products"} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map(el=>(<ProductItem id={el._id} key={el._id} image={el.image} name={el.name} price={el.price} />))}

            </div>

        </div>
    )
}

export default Relatedproduct