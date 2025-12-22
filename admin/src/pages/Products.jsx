import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import photo from '/assets/images/photo.png'

const Products = ({ token }) => {
  const [products, setProducts] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = '₹'

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchProducts()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <p className="p-3 text-neutral-200 tracking-widest font-bold sm:text-3xl text-2xl">
        All Product List
      </p>

      <div className="hidden lg:grid grid-cols-1
              md:grid-cols-[1fr_2fr_1fr]
              lg:grid-cols-[1fr_3fr_1fr_1fr_1.2fr]
        items-center py-3 px-5 text-neutral-200 bg-cyan-900 text-xl rounded-t-2xl">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      <div className="flex flex-col h-full md:h-auto bg-dark rounded-b-2xl sm:gap-2 gap-10">
        {products.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1
              md:grid-cols-[1fr_2fr_1fr]
              lg:grid-cols-[1fr_3fr_1fr_1fr_0fr]
              items-center py-3 px-5 sm:gap-3 gap-5"
          >
            {/* IMAGE */}
            <div className="flex items-center gap-3">
              <img
                src={item.images?.[0]?.url || photo}
                alt={item.name}
                className="md:w-16 w-30 md:h-16 h-30 object-cover rounded"
              />
            </div>

            {/* NAME */}
            <div>
              <span className="md:hidden font-bold text-neutral-500">Name: </span>
              <span className="font-bold text-xl text-neutral-100 tracking-widest ml-1">
                {item.name}
              </span>
            </div>

            {/* CATEGORY */}
            <div>
              <span className="md:hidden font-bold text-neutral-500">Category: </span>
              <span className="font-bold text-xl text-neutral-100 tracking-widest ml-1">
                {item.category}
              </span>
            </div>

            {/* PRICE */}
            <div>
              <span className="md:hidden font-bold text-neutral-500">Price: </span>
              <span className="font-bold text-xl text-neutral-100 tracking-widest ml-1">
                {currency}{item.price}
              </span>
            </div>

            {/* ACTION */}
            <div className="flex gap-3 justify-start lg:justify-center">
              {/* EDIT */}
              <NavLink
                to={`/edit-product/${item._id}`}
                className="md:px-8 px-5 md:py-0.5 py-2 rounded-md cursor-pointer
                text-md md:text-xl tracking-wide text-neutral-200 font-bold bg-emerald-700 hover:bg-emerald-800"
              >
                Edit
              </NavLink>

              {/* DELETE */}
              <button
                onClick={() => removeProduct(item._id)}
                className="md:px-8 px-5 md:py-0.5 py-2 rounded-md cursor-pointer
                text-md md:text-xl tracking-wide text-neutral-200 font-bold bg-rose-700 hover:bg-rose-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Products
