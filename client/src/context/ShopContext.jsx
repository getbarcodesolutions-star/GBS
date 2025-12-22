import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Initialize with localStorage directly

  // Initialize cart from Session Storage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = sessionStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const navigate = useNavigate();

  // Sync Cart to Session Storage
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ================= LOAD CART FROM DB ================= */
  const fetchUserCart = async (authToken) => {
    if (!authToken) return;
    try {
      const res = await axios.get(backendUrl + "/api/cart", {
        headers: { token: authToken },
      });
      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      }
    } catch (error) {
      console.log("Fetch cart error:", error);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (itemId, quantity = 1) => {
    if (!itemId) return;
    const id = String(itemId);

    // 1. Update Frontend State Immediately (Optimistic UI)
    setCartItems((prev) => {
      const prevQty = prev[id] || 0;
      const nextQty = prevQty + quantity;

      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: nextQty };
    });

    // 2. Update Database if Token Exists
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId: id, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Cart DB save error:", error);
        toast.error("Failed to sync with server");
      }
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (itemId) => {
    const id = String(itemId);

    setCartItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId: id, quantity: 0 },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearCart = () => {
    setCartItems({});
    sessionStorage.removeItem("cartItems");
  };

  const cartCount = useMemo(
    () => Object.values(cartItems).reduce((s, q) => s + (q || 0), 0),
    [cartItems]
  );

  const getCartTotal = () => {
    let total = 0;
    products.forEach((item) => {
      const id = String(item._id);
      if (cartItems[id] > 0) {
        total += item.price * cartItems[id];
      }
    });
    return total;
  };

  const getproductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getproductsData();
  }, []);

  // Fetch cart when token changes (Login/Load)
  useEffect(() => {
    if (token) {
      fetchUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount: () => cartCount,
    getCartTotal,
    cartCount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;