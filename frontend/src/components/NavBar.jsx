import React, { useContext, useEffect, useState } from 'react'
import { assets } from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const NavBar = () => {

    const [visible, setVisible] = useState(false)

    const { setShowSearch, count } = useContext(ShopContext)


    return (
        <div className="flex items-center justify-between py-5 font-medium" >

            <Link to={'/'}>
                <img className='w-36' src={assets.logo} alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink className="flex flex-col items-center  gap-1 " to={"/"}>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className="flex flex-col items-center  gap-1 " to={"/collections"}>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className="flex flex-col items-center  gap-1 " to={"/About"}>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className="flex flex-col items-center  gap-1 " to={"/Contact"}>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>

                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <Link to={"/login"}> <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                    </Link><div className='group-hover:block  hidden absolute dropdown-menu transition-all duration-200 right-0 pt-4'>

                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>

                            <p className=' cursor-pointer transform duration-200 hover:text-black '>My profile</p>
                            <p className=' cursor-pointer transform duration-200 hover:text-black '>Orders</p>
                            <p className=' cursor-pointer transform duration-200 hover:text-black '>Logout</p>
                        </div>
                    </div>
                </div>

                <Link
                    to={"cart"}
                    className='relative'
                >
                    <img src={assets.cart_icon} className='w-5 min-w-5' />
                    <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{count}</p>
                </Link>

                <img onClick={() => {
                    setVisible(true)
                }} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />

                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"} `}>
                    <div className='flex flex-col text-gray-600 '>

                        <div onClick={() => {
                            setVisible(false)
                        }} className='flex cursor-pointer items-center gap-4 p-3'>



                            <img src={assets.dropdown_icon} className='h-4 rotate-180 ' />
                            <p>Back</p>
                        </div>

                        <NavLink onClick={() => { setVisible(false) }} className="py-2 pl-6 border " to={"/"}>Home</NavLink>
                        <NavLink onClick={() => { setVisible(false) }} className="py-2 pl-6 border-x border-b  " to={"/collections"}>Collection</NavLink>
                        <NavLink onClick={() => { setVisible(false) }} className="py-2 pl-6 border-x border-b  " to={"/About"}>About</NavLink>
                        <NavLink onClick={() => { setVisible(false) }} className="py-2 pl-6 border-x border-b  " to={"/Contact"}>Contact</NavLink>



                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar
