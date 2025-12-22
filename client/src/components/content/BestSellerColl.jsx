import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import BestSeller from './BestSeller'
import Title from './Title'

const BestSellerColl = () => {
    
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    
      useEffect(() => {
        const Ourproduct = products.filter((item) => (item.bestseller))
        setBestSeller(Ourproduct.slice(0,10))
      }, [products])
  return (
    <>
      <div className='bg-neutral-100 h-auto'>
      <Title heading={'Best Selling Products'} />


      <div className='flex flex-wrap justify-center lg:gap-6 gap-2'>
        {
          bestSeller.map((item, index) => {
            return (
              <BestSeller key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
            )
          }
          )
        }
      </div>
    </div>
    </>
  )
}

export default BestSellerColl
