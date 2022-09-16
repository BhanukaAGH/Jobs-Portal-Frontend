import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../utils/jobCategories'

const Category = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-[#7D7D7D] to-white pt-8 pb-16'>
      <h1 className='text-xl md:text-4xl text-center font-[Poppins] text-white font-bold mb-4 md:mb-8 lg:mb-12'>
        Browse Job Category
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-5/6 lg:w-4/6 gap-x-6 md:gap-x-8 gap-y-6'>
        {categories.map((item, index) => (
          <Link
            to={`/jobs?category=${item.paramName}`}
            key={index}
            className='group relative flex items-center justify-center rounded-md overflow-hidden aspect-video cursor-pointer'
          >
            <h1 className='text-lg font-[Poppins] md:text-xl font-medium text-center text-white z-10'>
              {item.name}
            </h1>
            <img
              src={item.image}
              alt={`category-${index}`}
              className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition ease-in group-hover:opacity-80'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
