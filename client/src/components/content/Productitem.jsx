import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'

const Productitem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="block cursor-pointer w-35 mb-5 lg:mb-10 sm:w-72 md:w-80 lg:w-80 mt-5"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col [@media(min-width:2500px)]:h-120  xl:h-120  md:h-115 h-66 overflow-hidden">
        {/* Image Container */}
        <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-neutral-400 flex items-center justify-center flex-shrink-0">
          <img
            src={image?.[0]?.url}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info Section */}
        <div className="p-5 md:p-4 flex flex-col justify-between text-neutral-800 flex-grow">
          <p className="text-xs sm:text-lg font-semibold tracking-widest line-clamp-2 overflow-hidden text-ellipsis">
            {name}
          </p>
          <p className="text-md sm:text-xl lg:text-2xl flex gap-1 items-baseline">
            <span>{currency}</span>
            <span className="font-extrabold tracking-wider">{price}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Productitem
