import React from 'react'

const NewsLetterBox = () => {
    const handleSubmit=(e)=>{
        e.preventDefault()
        


    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae est corrupti veniam consequatur consectetur aliquid adipisci itaque voluptas culpa, dolores enim perferendis iste sed sit quam perspiciatis consequuntur architecto dolore!</p>
            <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3  mx-auto my-6 border pl-3'>
                <input required type="email" placeholder='enter your email' className='w-full sm:flex-1 outline-none ' />
                <button className='bg-black text-white text-xs px-10 py-4' type="submit">Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox
