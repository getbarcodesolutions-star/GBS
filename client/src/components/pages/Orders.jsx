// src/pages/Orders.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Footer from '../footer/Footer'
import axios from 'axios'

const Orders = () => {
  const { currency, navigate, token, setToken, backendUrl, setCartItems } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const fetchOrders = async () => {
    try {
      if (!token) return null

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })

      if (response.data.success) {
        let allOrdersItem = []

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['grandTotal'] = order.amount 
            allOrdersItem.push(item)
          })
        })

        // REMOVED .reverse() TO KEEP ORIGINAL DATABASE ORDER (Oldest First)
        setOrderData(allOrdersItem) 
      }
    } catch (error) {
      console.log("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  const logOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <>
      <div className='lg:mt-17 '>
        <h1 className='lg:p-10 sm:p-5 p-3 lg:text-6xl sm:text-4xl text-2xl text-neutral-700 tracking-widest text-center md:text-left'>
          MY ORDERS
        </h1>
      </div>

      <div className='px-5 sm:px-10 w-full h-full'>
        {orderData.length === 0 ? (
          <p className="p-6 text-center text-neutral-600 text-xl font-bold">
            You have no orders yet.
          </p>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='py-4 w-full border-t border-neutral-300 border-b text-neutral-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-4'>
              <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 text-sm w-full'>

                <div className='w-24 h-24 sm:w-30 sm:h-30 rounded-sm bg-neutral-100 overflow-hidden border border-neutral-200'>
                  {item.images && item.images.length > 0 ? (
                    <img
                      className='w-full h-full object-cover'
                      src={item.images[0].url}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-[10px] text-neutral-400'>
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className='space-y-3 w-full'>
                  <p className='text-xl sm:text-2xl font-black uppercase'>{item.name}</p>

                  <div className='flex flex-col sm:flex-row gap-2 sm:gap-5'>
                    <p className='text-lg sm:text-xl flex gap-1 font-bold'>
                      <span className='text-neutral-400 text-sm self-center'>Grand Total:</span>
                      <span>{currency}</span>
                      <span className='tracking-widest'>
                        {/* Displaying the grandTotal attached from order.amount */}
                        {item.grandTotal.toLocaleString()}
                      </span>
                    </p>

                    <p className='text-lg sm:text-xl font-light'>
                      <span className='font-bold'>Qty :</span>
                      <span className='tracking-wider'> {item.quantity}</span>
                    </p>
                  </div>

                  <p className='text-lg sm:text-xl'>
                    <span className='font-bold'>Date :</span>{' '}
                    <span className='text-md sm:text-lg font-bold text-neutral-500'>
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row justify-between items-center w-full md:w-1/2 gap-4'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></p>
                  <p className='text-base sm:text-lg tracking-wider font-bold'>
                    {item.status || "Order Placed"}
                  </p>
                </div>
                <button onClick={fetchOrders} className='p-3 text-base sm:text-lg shadow-lg tracking-wide font-bold bg-[#70b3da] text-[#06324d] rounded-sm cursor-pointer w-full sm:w-auto'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='p-10'>
        <button onClick={logOut} className='mr-10 px-15 py-2 text-xl font-black text-rose-900 hover:text-rose-100 cursor-pointer rounded-2xl bg-rose-300 hover:bg-rose-600 shadow-2xs shadow-red-300'>
          Log out
        </button>
      </div>

      <div className='mt-20'>
        <Footer />
      </div>
    </>
  )
}

export default Orders