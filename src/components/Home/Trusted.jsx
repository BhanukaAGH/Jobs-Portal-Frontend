import React from 'react'
import GoogleLogo from '../../assets/Google.webp'
import NetflixLogo from '../../assets/Netflix.webp'
import AirbnbLogo from '../../assets/Airbnb.webp'
import MicrosoftLogo from '../../assets/Microsoft.webp'
import TwitchLogo from '../../assets/Twitch.webp'

const Trusted = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full py-12 select-none'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-12 text-center text-[#0A2537]'>
        Trusted by 5,000+ Companies Worldwide
      </h1>
      <div className='flex flex-wrap items-center justify-evenly gap-2 gap-x-8 w-5/6'>
        <img src={GoogleLogo} alt='google-logo' className='w-20 md:w-auto' />
        <img src={NetflixLogo} alt='netflix-logo' className='w-20 md:w-auto' />
        <img src={AirbnbLogo} alt='airbnb-logo' className='w-20 md:w-auto' />
        <img
          src={MicrosoftLogo}
          alt='microsoft-logo'
          className='w-20 md:w-auto'
        />
        <img src={TwitchLogo} alt='twitch-logo' className='w-20 md:w-auto' />
      </div>
    </div>
  )
}

export default Trusted
