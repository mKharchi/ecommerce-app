import React, { useContext, useEffect  , useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const location = useLocation()
  const  [visible, setVisible] = useState(false)
  useEffect(()=>{
    if (location.pathname.includes('collections')) {
        setVisible(true)
    }else{
      setVisible(false)
    }
  } , [location.pathname])
  
  return (showSearch && visible) ? (
    <div className='  bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input onChange={(e)=>{setSearch(e.target.value)}} value={search} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm  '  />
        <img src={assets.search_icon} className='w-4 ' alt="" />

      </div> 
      <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='w-3 cursor-pointer inline ' alt="" />
    </div>
  ) : null
}

export default SearchBar
