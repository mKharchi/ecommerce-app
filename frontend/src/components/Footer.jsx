import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-4 w-32' alt="Logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, in aut aperiam error commodi maiores ullam voluptatum! Cupiditate fuga porro sit similique expedita doloribus autem consequatur qui vel, maxime unde?
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>Get in touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+213123456789</li>
                        <li>myemail@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className="my-6" />
            <p className='py-5 text-sm text-center'>
                Copyright 2025@ - All rights reserved
            </p>
        </div>
    )
}

export default Footer
