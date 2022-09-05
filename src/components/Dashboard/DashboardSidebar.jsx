import React from 'react'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { adminLinks, companyLinks } from '../../utils/NavLinks'

const DashboardSidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='dashboard-sideNav'>
      {/* Side NavLink */}
      {user?.role === 'company' &&
        companyLinks.map((link) => (
          <div
            key={link.id}
            data-tip={link.name}
            className={`dashboard-link ${
              active === link.id && '!bg-black !text-white'
            }`}
            onClick={() => setActive(link.id)}
          >
            <link.icon className='text-lg md:text-2xl' />
            <p className='hidden md:block'>{link.name}</p>
          </div>
        ))}

      {user?.role === 'admin' &&
        adminLinks.map((link) => (
          <div
            key={link.id}
            data-tip={link.name}
            className={`dashboard-link ${
              active === link.id && '!bg-black !text-white'
            }`}
            onClick={() => setActive(link.id)}
          >
            <link.icon className='text-lg md:text-2xl' />
            <p className='hidden md:block'>{link.name}</p>
          </div>
        ))}

      <ReactTooltip
        place='right'
        type='dark'
        effect='solid'
        className='!block md:!hidden'
      />
    </div>
  )
}

export default DashboardSidebar
