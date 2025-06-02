import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Relatedproduct from '../components/Relatedproduct'
const Product = () => {
  const { productId } = useParams()
  const { products, currency , addToCart } = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [images, setimages] = useState('')
  const [size, setSize] = useState("")
  {/* functions */ }
  const fetchProductData = async () => {

    products.map(item => {
      if (item._id === productId) {

        setproductData(item)
        setimages(item.image[0])
        return null
      }
    })
  }



  useEffect(() => {
    fetchProductData()
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10  transition-opacity ease-in duration-500 opacity-100 '>

      <div className=" flex gap-12  flex-col sm:flex-row  ">
        <div className="w-full flex  flex-col-reverse gap-3 sm:flex-row ">

          <div className=" flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19.7%] w-full ">
            {
              productData.image.map((el, indeex) => (<img src={el} onClick={() => setimages(el)} key={indeex} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer  ' />))
            }
          </div>
          <div className="w-full sm:w-[80%]  ">
            <img src={images} alt="" className='w-full h-auto' width={2000} height={2000} />
          </div>



          <div className="w-full">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">

              <img src={assets.star_icon} className='w-3.5' />

              <img src={assets.star_icon} className='w-3.5' />

              <img src={assets.star_icon} className='w-3.5' />

              <img src={assets.star_icon} className='w-3.5' />

              <img src={assets.star_dull_icon} className='w-3.5' />

              <p className='pl-2'>

                (122)

              </p>

            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
            <div className="flex flex-col  gap-4 my-8">
              <p>Select size</p>
              <div className="flex gap-2">
                {productData.sizes.map((el, index) => (<button onClick={() => setSize(el)} className={` py-2 px-4 bg-gray-100 ${el === size ? "border border-orange-500" : ""} `} key={index}>{el}</button>))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id , size)} className='bg-black text-white py-2 px-4 text-sm active:bg-gray-700'>
              Add to cart
            </button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>Cash on delivery available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>

        </div>


      </div>
      {/**Description */}

      <div className="mt-20">
        <div className='flex '>
          <b className='px-5 py-3 text-sm '>Description</b>
          <p className='px-5 py-3 text-sm '>Reviews (122</p>
        </div>
        <div className='flex flex-col gap-4  p-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, ut iste repellat, nisi pariatur, similique laboriosam dignissimos eius quod laudantium dolorum vel? Enim nobis ipsum blanditiis vitae, eum ipsa earum.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, ut iste repellat, nisi pariatur, similique laboriosam dignissimos eius quod laudantium dolorum vel? Enim nobis ipsum blanditiis vitae, eum ipsa earum.</p>
        </div>
      </div>
        
        {/**Related products */}
          <Relatedproduct category={productData.category} subcategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product