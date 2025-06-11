import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collections = () => {
  const { products , search , showSearch } = useContext(ShopContext)
  const [showFilters, setShowFilters] = useState(false)
  const [filteredP, setFilterP] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sortType , setSortType] = useState("relevant")

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubcategory(prev => [...prev, e.target.value])
    }
  }

  const sortP = () => {
    const filP = filteredP.slice()
    switch (sortType) {
      case "low-high":
        setFilterP(filP.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setFilterP(filP.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilters()
        break;
    }
  }


  useEffect(() => {
    applyFilters()
  }, [category, subcategory , search , showSearch , products])
  

  useEffect(() => {
    sortP()
  }, [sortType])



  const applyFilters = () => {
    let productsCopy = products.slice()
    
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory))
    }

    setFilterP(productsCopy)
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={() => { setShowFilters(!showFilters) }} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilters && "rotate-90"} `} />
        </p>
        <div className={` sm:block border border-gray-300 pl-5 py-3 mt-6 ${!showFilters && "hidden"}`}>

          <p className='mb-3 text-sm font-medium '>Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input onChange={toggleCategory} type="checkbox" className='w-5' value={"Men"} />Men
            </p>

            <p className="flex gap-2">
              <input onChange={toggleCategory} type="checkbox" className='w-5' value={"Women"} />Women
            </p>


            <p className="flex gap-2">

              <input onChange={toggleCategory} type="checkbox" className='w-5 ' value={"Kids"} />Kids

            </p>

          </div>
        </div>

        <div className={` sm:block border border-gray-300 pl-5 py-3 my-5 ${!showFilters && "hidden"}`}>
          <p className='mb-3 text-sm font-medium '>Type
          </p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} type="checkbox" className='w-5' value={"Topwear"} />Topwear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} type="checkbox" className='w-5' value={"Bottomwear"} />TopWear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} type="checkbox" className='w-5 ' value={"Winterwear"} />Winterwear
            </p>
          </div>

        </div>




      </div>
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          <select onChange={(e)=>{setSortType(e.target.value)}} className='border-2 border-gray-300 text-sm px-2 '>
            <option value="relevant">Sort by: relevant</option>
            <option value="low-high">Sort by: low-to-high</option>
            <option value="high-low">Sort by: high-to-low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredP.map((item, id) => {
            return <ProductItem key={id} id={item._id} name={item.name} price={item.price} image={item.image} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Collections
