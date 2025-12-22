import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const Collection = ({ heading }) => {

  const { products } = useContext(ShopContext)
  const [productItem, setProductItem] = useState([])

  useEffect(() => {
    const Ourproduct = products.filter((item) => (item.category==='label','ribbon'))
    setProductItem(Ourproduct.slice(0,10))
  }, [products])

  return (
    <div className='bg-neutral-100 h-auto'>
      <Title heading={'Our Products'} />


      <div className='flex flex-wrap justify-center lg:gap-6 gap-2'>
        {
          productItem.map((item, index) => {
            return (
              <Productitem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Collection
