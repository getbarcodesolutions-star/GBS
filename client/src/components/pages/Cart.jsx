// Cart.jsx
import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import remove from '/assets/images/delete.png'
import ThreeIcons from "../content/ThreeIcons";
import Footer from "../footer/Footer";

const Cart = () => {
  const {
    products = [],
    cartItems = {},
    currency,
    addToCart,
    getCartTotal,
    removeFromCart,
    navigate
  } = useContext(ShopContext);

  // Filter products that are in the cart (quantity > 0)
  const cartProducts = products.filter((p) => (cartItems[String(p._id)] || 0) > 0);
  const subtotal = getCartTotal();
  const isCartEmpty = subtotal === 0;

  // delivery rules (numeric)
  const deliveryChargeValue = isCartEmpty ? 0 : subtotal >= 1999 ? 0 : 100;
  const deliveryChargeDisplay = isCartEmpty
    ? `${currency}0.00`
    : subtotal >= 1999
      ? "Free"
      : `${currency}${deliveryChargeValue.toFixed(2)}`;

  // helper that ensures we always use string keys and integer quantities
  const safeId = (id) => String(id);

  const grandTotal = subtotal + subtotal * 0.18 + deliveryChargeValue;

  return (
    <div className="lg:mt-17 mt-15 min-h-screen bg-neutral-200">
      {cartProducts.length > 0 ? (
        <p className="lg:p-10 sm:p-5 p-3 lg:text-6xl sm:text-4xl text-2xl text-neutral-700 tracking-widest">
          YOUR CART
        </p>
      ) : (
        <p className="lg:p-10 sm:p-5 p-3 lg:text-6xl sm:text-4xl text-2xl text-neutral-700 tracking-widest">
          YOUR CART IS EMPTY...
        </p>
      )}

      {/* Main layout: row on lg+, stacked on smaller */}
      <div className="h-full select-none w-full flex lg:flex-row flex-col gap-0 px-4 lg:px-0">
        {/* LEFT: items - keeps lg width 70%, full width on small */}
        <div className="h-full lg:w-[70%] w-full flex flex-col gap-5 lg:p-10 p-5">
          {cartProducts.map((item) => {
            const id = safeId(item._id);
            const qty = cartItems[id] || 0;

            // when user types a number manually, compute delta and call addToCart
            const handleQtyInput = (e) => {
              const raw = e.target.value;
              const parsed = raw === "" ? 0 : Number(raw);
              if (Number.isNaN(parsed)) return;
              let newQty = Math.floor(parsed);
              if (newQty < 0) newQty = 0;
              if (newQty > 100) newQty = 100;
              const delta = newQty - qty;
              if (delta === 0) return;
              addToCart(id, delta);
            };

            return (
              <div
                key={id}
                className="bg-white p-2.5 duration-200 transition-all shadow-xl rounded-2xl w-full flex flex-row gap-4 sm:gap-0 items-start sm:items-center"
              >
                {/* IMAGE */}
                <div className="flex sm:w-auto w-full justify-center">
                  <img
                    className="w-30 h-30 sm:w-40 sm:h-40 rounded-2xl shadow object-cover"
                    src={item.image?.[0] || item.image || ""}
                    alt={item.name}
                  />
                </div>

                {/* MAIN INFO */}
                <div className="m-0 sm:ml-3 text-neutral-800 flex-1 flex flex-col gap-3">
                  <h1 className="text-xs sm:text-2xl font-semibold tracking-wider">
                    {item.name}
                  </h1>

                  <div className="flex items-center justify-start gap-4">
                    <div className="border-neutral-400 border w-fit rounded-2xl flex items-center">
                      <button
                        className="sm:px-2 px-1 py-0  sm:py-1 text-lg  sm:text-xl text-neutral-100 font-semibold bg-[#021024] hover:bg-[#052659] cursor-pointer rounded-l-2xl"
                        onClick={() => addToCart(id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>

                      <input
                        className="outline-none w-10 sm:w-20 px-3 text-lg sm:text-xl font-black text-center"
                        type="text"
                        value={qty}
                        min={1}
                        max={100}
                        onChange={handleQtyInput}
                      />

                      <button
                        className="sm:px-2 px-1 py-0  sm:py-1 text-lg sm:text-xl text-neutral-100 font-semibold bg-[#021024] hover:bg-[#052659] cursor-pointer rounded-r-2xl"
                        onClick={() => addToCart(id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* DELETE */}
                    <button
                      className="cursor-pointer ml-2 flex items-center"
                      onClick={() => removeFromCart(item._id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <img className="w-6 h-6 sm:w-7 sm:h-7" src={remove} alt="delete" />
                    </button>
                  </div>
                </div>

                {/* SEPARATOR */}
                <div className="hidden sm:block bg-neutral-400 w-0.5 h-full rounded-2xl" />

                {/* PRICE */}
                <div className="flex items-center justify-center w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl flex gap-2 items-baseline">
                    <span className="text-lg sm:text-xl">{currency}</span>
                    <span className="text-xl sm:text-3xl font-black tracking-wide">
                      {(item.price * qty).toFixed(2)}
                    </span>
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: summary */}
        {cartProducts.length > 0 && (
          <div className="lg:w-[28%] w-full mt-6 lg:mt-10 bg-white shadow-2xl rounded-xl h-full">
            <div className="p-5">
              <h1 className="text-3xl md:text-4xl tracking-widest">CART TOTAL</h1>
            </div>

            <div className="w-full h-0.5 flex justify-center">
              <div className="bg-neutral-300 w-[95%] h-full"></div>
            </div>

            <div className="mt-3 flex flex-col gap-1 p-1">
              {cartProducts.map((item, index) => {
                const qty = cartItems[String(item._id)] || 0;
                const total = item.price * qty;
                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center p-2 bg-neutral-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-200 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-xs sm:w-auto w-35 space-x-2 sm:text-lg font-semibold text-neutral-800">
                        <span>{item.name} x</span>
                        <span className="font-bold">{qty}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-sm sm:text-lg text-neutral-700 font-black tracking-widest">
                        {currency}{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-neutral-400 mt-1 flex justify-between p-3">
              <h1 className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                SubTotal
              </h1>
              <h1 className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                {currency}{getCartTotal().toFixed(2)}
              </h1>
            </div>

            <div className="mt-1 flex justify-between p-3">
              <h1 className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                Tax
              </h1>
              <h1 className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                {currency}{(getCartTotal() * 0.18).toFixed(2)}
              </h1>
            </div>

            <div className="mt-1 flex justify-between p-3">
              <h1 className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                Delivery Charge
              </h1>
              <p className="text-base md:text-lg font-black tracking-wide text-neutral-800">
                {deliveryChargeDisplay}
              </p>
            </div>

            <div className="mt-1 border-t border-neutral-400 bg-neutral-900 text-neutral-300 flex justify-between p-3">
              <h1 className="text-lg md:text-2xl font-black tracking-widest">
                Grand Total
              </h1>
              <h1 className="text-lg md:text-2xl font-black tracking-widest">
                {currency}{grandTotal.toFixed(2)}
              </h1>
            </div>

            <div className="p-0">
              <button
                onClick={() => navigate('/onestepcheckout')}
                className="w-full p-4 text-xl md:text-2xl font-black cursor-pointer text-[#06324d] tracking-widest bg-[#70b3da] rounded-b-xl"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {cartProducts.length > 0 ? (
          <div className="lg:mt-15 mt-10">
            <ThreeIcons />
            <Footer />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Cart;
