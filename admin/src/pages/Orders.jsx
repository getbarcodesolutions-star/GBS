import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = ({ token, backendUrl }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post (
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        fetchAllOrders()
        toast.success('Status Updated')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="p-2 max-w-full mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-neutral-200">
        All Orders
      </h3>

      <div className="space-y-4 max-h-full">
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              bg-dark border border-neutral-800 rounded-lg
              p-4 sm:p-6 md:p-8
              text-neutral-200
              shadow-sm shadow-neutral-600
              sm:h-auto h-170
            "
          >
            {/* GRID */}
            <div
              className="
                grid gap-4
                grid-cols-1
                md:grid-cols-[0.5fr_2fr_1fr]
                lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
                items-start
              "
            >
              {/* Parcel */}
              <div className="flex justify-center md:justify-start">
                <span className="text-6xl md:text-8xl">📦</span>
              </div>

              {/* Items + Address */}
              <div>
                {order.items.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-lg sm:text-xl font-semibold"
                  >
                    {item.name}
                    <span className="block text-sm">
                      Qty: {item.quantity}
                    </span>
                    <span className="block text-neutral-300 text-sm">
                      Size: {item.size || 'N/A'}
                    </span>
                  </p>
                ))}

                <p className="mt-4 font-bold">
                  <span className="text-neutral-400">Name:</span>{' '}
                  {order.address.firstName}{' '}
                  {order.address.lastName}
                </p>

                {/* Conditional Company Display */}
                {order.address.company && (
                  <p className="mt-1 font-bold text-sm">
                    <span className="text-neutral-400">Company:</span>{' '}
                    {order.address.company}
                  </p>
                )}

                {/* Conditional GST Display */}
                {order.address.gst && (
                  <p className="mt-1 font-bold text-sm">
                    <span className="text-neutral-400">GST:</span>{' '}
                    {order.address.gst}
                  </p>
                )}

                <p className="mt-2 font-bold text-sm leading-relaxed">
                  <span className="text-neutral-400">
                    Address:
                  </span>{' '}
                  {order.address.street},{' '}
                  {order.address.city},{' '}
                  {order.address.zip}
                </p>

                <p className="mt-2 font-bold text-sm">
                  <span className="text-neutral-400">
                    Phone:
                  </span>{' '}
                  {order.address.phone}
                </p>
              </div>

              {/* Stats */}
              <div className="text-sm space-y-1">
                <p className="font-bold">
                  Items: {order.items.length}
                </p>
                <p className="font-bold text-neutral-300">
                  Method: {order.paymentMethod}
                </p>
                <p
                  className={
                    order.payment
                      ? 'text-green-600 font-bold'
                      : 'text-red-500 font-bold'
                  }
                >
                  Payment:{' '}
                  {order.payment ? 'Done' : 'Pending'}
                </p>
                <p className="text-neutral-400">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Price */}
              <div className="font-black text-lg">
                <span className="block text-neutral-400 text-sm">
                  Total:
                </span>
                ₹ {order.amount.toLocaleString()}
              </div>

              {/* Status */}
              <div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    statusHandler(e, order._id)
                  }
                  className="
                    w-full
                    py-2 px-3
                    border border-neutral-600 rounded
                    bg-blue font-semibold
                    outline-none
                  "
                >
                  <option value="Order Placed">
                    Order Placed
                  </option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">
                    Out for delivery
                  </option>
                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders