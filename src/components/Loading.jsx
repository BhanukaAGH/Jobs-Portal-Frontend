import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Oval
        height={60}
        width={60}
        color='black'
        secondaryColor='lightgray'
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  )
}

export default Loading
