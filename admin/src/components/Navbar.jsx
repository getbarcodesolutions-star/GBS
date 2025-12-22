import React from 'react'
import logo from '/assets/images/mainlogo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='p-4 flex justify-between items-center border border-b-neutral-800 bg-dark '>
      <img className='sm:w-50 w-30 rounded-xl' src={logo} alt="" />
      <button
      onClick={()=>setToken('')}
      className='md:py-2 md:px-10 py-0.5 px-3 shadow-xl shadow-red-900 md:rounded-xl rounded-md cursor-pointer text-sm md:text-lg font-bold bg-red-500 text-neutral-100 tracking-wide'>Logout</button>

    </div>
  )
}

export default Navbar