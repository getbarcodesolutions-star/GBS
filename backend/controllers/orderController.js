import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* ================= PLACE ORDER ================= */
export const placeOrder = async (req, res) => {
  try {
    // 🔥 TAKE USER ID FROM AUTH MIDDLEWARE
    const userId = req.user._id;

    const { items, amount, address } = req.body;

    if (!items || !items.length) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,                      // ✅ FIX
      items,
      address,
      amount,
      paymentMethod: "Testing order",
      payment: false,              // ✅ BOOLEAN (not string)
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);

    // ✅ CLEAR USER CART AFTER ORDER
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed",
      order: newOrder,
    });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= ALL ORDERS (ADMIN) ================= */
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= USER ORDERS ================= */
export const userOrders = async (req, res) => {
  try {
    // 🔥 FROM AUTH, NOT BODY
    const userId = req.user._id;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= UPDATE STATUS (ADMIN) ================= */
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
