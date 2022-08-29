import React from 'react'
import Category1 from '../../assets/Category1.webp'
import Category2 from '../../assets/Category2.webp'
import Category3 from '../../assets/Category3.webp'
import Category4 from '../../assets/Category4.webp'
import Category5 from '../../assets/Category5.webp'
import Category6 from '../../assets/Category6.webp'

const categories = [
  {
    name: 'IT/Telecommunication',
    image: Category1,
  },
  {
    name: 'Management',
    image: Category2,
  },
  {
    name: 'Digital & Creative',
    image: Category3,
  },
  {
    name: 'Sales & Marketing',
    image: Category4,
  },
  {
    name: 'Accounting',
    image: Category5,
  },
  {
    name: 'Design & Art',
    image: Category6,
  },
]

const Category = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-[#7D7D7D] to-white pt-8 pb-16'>
      <h1 className='text-xl md:text-4xl text-center font-[Poppins] text-white font-bold mb-4 md:mb-8 lg:mb-12'>
        Browse Job Category
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-5/6 lg:w-4/6 gap-x-6 md:gap-x-8 gap-y-6'>
        {categories.map((item, index) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
