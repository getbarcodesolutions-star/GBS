import React from 'react'
import { NavLink } from 'react-router-dom'

import checklist from '/assets/images/checklist.png'
import add_to_basket from '/assets/images/add-to-basket.png'
import received from '/assets/images/received.png'
import group from '/assets/images/group.png'

const navItems = [
  { to: '/add', label: 'Add', icon: add_to_basket },
  { to: '/products', label: 'Products', icon: checklist },
  { to: '/orders', label: 'Orders', icon: received },
  // { to: '/customers', label: 'Customers', icon: group },
]

const Slidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-5 p-3 cursor-pointer
     hover:bg-[#05254ace] transition-colors duration-200
     ${isActive ? 'bg-[#05254ace]' : ''}`

  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1
     transition-transform duration-200
     ${isActive ? 'scale-110 text-blue-400' : 'scale-100'}`

  return (
    <>
      {/*  DESKTOP & TABLET SIDEBAR  */}
      <div className="hidden sm:flex  flex-col w-100 bg-dark">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <img src={item.icon} alt={item.label} className="w-8 h-8" />
            <h1 className="text-2xl w-40 font-bold text-neutral-300">
              {item.label}
            </h1>
          </NavLink>
        ))}
      </div>

      {/*  MOBILE BOTTOM NAV   */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden
                      bg-dark border-t border-[#05254ace]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={mobileLinkClass}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-8 h-8"
              />
              <span className="text-xs text-neutral-300">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}

export default Slidebar
