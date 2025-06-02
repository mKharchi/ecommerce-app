import React from 'react'
import Title from '../components/Title'

import { assets } from "../assets/assets"
import NewsLetterBox from '../components/NewsLetterBox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"About"} text2={"us"} />
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img src={assets.about_img} className='w-full md:max-w-[450px]  ' alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, accusantium adipisci? Nam, numquam quaerat eos repellat voluptates aspernatur inventore incidunt deleniti, dicta atque exercitationem dolores! Tenetur nesciunt asperiores culpa maxime?</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid in debitis recusandae asperiores ex deserunt veniam quod placeat? Perferendis et dolorem voluptatum deserunt obcaecati quos aspernatur? Voluptas impedit animi debitis.</p>
            <b className='text-gray-800'>Our mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque id corrupti autem sequi eum magnam, reiciendis temporibus sit. Temporibus, natus officiis! Facere neque fugit nemo eaque. Nobis doloribus temporibus saepe?</p>
          </div>
        </div>

      </div>

      <div className="text-4xl py-4 ">
        <Title text1={"Why"} text2={"Chose us"} />

      </div>


      <div className="flex flex-col md:flex-row text-sm mb-20">

        <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iusto, beatae omnis modi delectus aliquid aut ipsa tempore odit non, iure voluptatem veniam autem recusandae. Eveniet eligendi ratione aspernatur beatae!</p>

        </div>
        <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iusto, beatae omnis modi delectus aliquid aut ipsa tempore odit non, iure voluptatem veniam autem recusandae. Eveniet eligendi ratione aspernatur beatae!</p>

        </div>
        <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exception customer service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iusto, beatae omnis modi delectus aliquid aut ipsa tempore odit non, iure voluptatem veniam autem recusandae. Eveniet eligendi ratione aspernatur beatae!</p>

        </div>

      </div>

      <NewsLetterBox />


    </div>)
}

export default About