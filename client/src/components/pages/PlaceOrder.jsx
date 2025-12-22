import React, { useContext, useState } from 'react'
import RazorpayImage from '/assets/images/razor-pay.png' 
import { ShopContext } from "../../context/ShopContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const {
    products,
    cartItems,
    currency,
    getCartTotal,
    navigate,
    backendUrl,
    token,
    setCartItems
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zip: '',
    company: '',
    phone: '',
    gst: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const cartProducts = products.filter((p) => (cartItems[String(p._id)] || 0) > 0);
  const subtotal = getCartTotal();
  const deliveryChargeValue = subtotal === 0 ? 0 : subtotal >= 1999 ? 0 : 100;
  const deliveryChargeDisplay = subtotal === 0 ? `${currency}0.00` : subtotal >= 1999 ? "Free" : `${currency}${deliveryChargeValue.toFixed(2)}`;
  const grandTotal = subtotal + (subtotal * 0.18) + deliveryChargeValue;

  const handlePlaceOrder = async (ev) => {
    ev.preventDefault();
    if (!token) return toast.error("Please login to continue");

    try {
      setSubmitting(true);

      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = products.find(product => String(product._id) === String(itemId));
          if (itemInfo) {
            const itemCopy = structuredClone(itemInfo);
            itemCopy.quantity = cartItems[itemId];
            orderItems.push(itemCopy);
          }
        }
      }

      // We send address, items, and amount. 
      // The backend 'auth' middleware will add the 'userId' to req.body automatically.
      let orderData = {
        address: formData,
        items: orderItems,
        amount: grandTotal
      };

      const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
        toast.success("Order Placed Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred during checkout");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <>
          <div className='2xl:mt-17 mt-15'>
            <h1 className='2xl:text-6xl py-5 sm:text-4xl text-2xl font-black text-center text-neutral-700 tracking-widest'>
              One Step Checkout
            </h1>
          </div>

          <div className='h-auto w-full flex flex-col 2xl:flex-row 2xl:items-start gap-6 mx-auto px-4'>
            {/* LEFT SIDE: SHIPPING FORM */}
            <div className='w-full 2xl:w-[60%] h-auto p-6 2xl:p-10'>
              <div className='w-full rounded-t-xl bg-[#C1E8FF]'>
                <h1 className='p-3 text-3xl text-[#3180ae] tracking-wide font-semibold '>Shipping Address</h1>
              </div>

              <form id="place-order-form" className='mt-2 space-y-5 bg-[#c1e8ff42] rounded-b-xl p-4 2xl:p-5' onSubmit={handlePlaceOrder}>
                <div className='flex flex-col md:flex-row gap-5'>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>First name <span className='text-red-500'>*</span></h1>
                    <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="text" placeholder='First name ' />
                  </div>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Last name <span className='text-red-500'>*</span></h1>
                    <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="text" placeholder='Last name ' />
                  </div>
                </div>

                <div className='w-full'>
                  <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Email Address <span className='text-red-500'>*</span></h1>
                  <input required name="email" onChange={onChangeHandler} value={formData.email} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type='email' placeholder='Email address' />
                </div>

                <div className='w-full'>
                  <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Street Address <span className='text-red-500'>*</span></h1>
                  <textarea required name="street" onChange={onChangeHandler} value={formData.street} placeholder='Full Address' rows={3} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]"></textarea>
                </div>

                <div className='flex flex-col md:flex-row gap-5'>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>City <span className='text-red-500'>*</span></h1>
                    <input required name="city" onChange={onChangeHandler} value={formData.city} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="text" placeholder='City' />
                  </div>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Zip code <span className='text-red-500'>*</span></h1>
                    <input required name="zip" onChange={onChangeHandler} value={formData.zip} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="number" placeholder='Zip code' />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5'>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest flex gap-2 items-center font-semibold p-2'>Company<span className='text-neutral-700 font-light text-xs'>Optional</span></h1>
                    <input name="company" onChange={onChangeHandler} value={formData.company} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="text" placeholder='Company' />
                  </div>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Phone <span className='text-red-500'>*</span></h1>
                    <input required name="phone" onChange={onChangeHandler} value={formData.phone} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="number" placeholder='Phone' />
                  </div>
                  <div className='w-full md:w-1/2'>
                    <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest flex gap-2 items-center font-semibold p-2'>GSTIN<span className='text-neutral-700 font-light text-xs'>Optional</span></h1>
                    <input name="gst" onChange={onChangeHandler} value={formData.gst} className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 outline-none focus:ring-3 focus:ring-[#C1E8FF]" type="text" placeholder='GSTIN' />
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE: PAYMENT & SUMMARY */}
            <div className='w-full 2xl:w-[40%] h-auto space-y-6 p-6 2xl:p-10'>
              
              <div>
                <div className='w-full rounded-t-xl bg-[#C1E8FF]'>
                  <h1 className='p-3 text-3xl text-[#3180ae] tracking-wide font-semibold '>Payment Method</h1>
                </div>
                <div className='mt-2 space-y-5 bg-[#c1e8ff42] rounded-b-xl p-4 2xl:p-5'>
                  <h1 className='text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Pay with Razorpay</h1>
                  <h1 className='text-sm md:text-xl text-[#08246c] tracking-widest font-semibold p-2'>Card, UPI, Netbanking — secure checkout</h1>
                  <img className='h-12 md:h-16 w-auto mt-2' src={RazorpayImage || null} alt="Razorpay" />
                </div>
              </div>

              <div>
                <div className='w-full rounded-t-xl bg-[#C1E8FF]'>
                  <h1 className='p-3 text-3xl text-[#3180ae] tracking-wide font-semibold '>Order Summary</h1>
                </div>
                <div className='mt-2 space-y-5 bg-[#c1e8ff42] rounded-b-xl p-4 2xl:p-5'>
                  {cartProducts.map((item) => (
                    <div key={item._id} className='w-full items-center flex justify-between min-w-0'>
                      <span className="text-xs md:text-lg font-semibold">{item.name} x {cartItems[item._id]}</span>
                      <span className="text-sm md:text-lg font-black">{currency}{(item.price * cartItems[item._id]).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-neutral-400 mt-1 flex justify-between p-3">
                    <h1 className="text-base md:text-lg font-black text-neutral-800">SubTotal</h1>
                    <h1 className="text-base md:text-lg font-black text-neutral-800">{currency}{subtotal.toFixed(2)}</h1>
                  </div>
                  <div className="flex justify-between p-3">
                    <h1 className="text-base md:text-lg font-black text-neutral-800">Tax (18%)</h1>
                    <h1 className="text-base md:text-lg font-black text-neutral-800">{currency}{(subtotal * 0.18).toFixed(2)}</h1>
                  </div>
                  <div className="flex justify-between p-3">
                    <h1 className="text-base md:text-lg font-black text-neutral-800">Delivery</h1>
                    <h1 className="text-base md:text-lg font-black text-neutral-800">{deliveryChargeDisplay}</h1>
                  </div>

                  <div className="border-t border-neutral-400 bg-neutral-900 text-neutral-300 flex justify-between p-3 rounded-2xl">
                    <h1 className="text-lg md:text-2xl font-black">Grand Total</h1>
                    <h1 className="text-lg md:text-2xl font-black">{currency}{grandTotal.toFixed(2)}</h1>
                  </div>

                  <button 
                    type="submit" 
                    form="place-order-form" 
                    disabled={submitting} 
                    className="w-full p-4 text-base md:text-xl font-black cursor-pointer text-[#06324d] bg-[#70b3da] rounded-2xl disabled:opacity-50"
                  >
                    {submitting ? 'Placing order...' : 'PLACE ORDER'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="p-10 text-2xl text-center">Your cart is empty.</p>
      )}
    </>
  )
}

export default PlaceOrder