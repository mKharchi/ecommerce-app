import React from 'react'
import Title from "../components/Title"
import NewsLetterBox from "../components/NewsLetterBox"


import { assets } from '../assets/assets'
const Contact = () => {
  return (


    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"us"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className=" flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-500'>bzdbljsbd <br /> askjbhsjbd askjjbsjab</p>
          <p className='text-gray-500'>Tel:(213) 0795736069 <br /> Email:kh.merouane.abderrahmane@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job opening</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>


      <NewsLetterBox />
    </div>
  )
}

export default Contact