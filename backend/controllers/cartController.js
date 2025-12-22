import userModel from "../models/userModel.js";

/* ================= GET USER CART ================= */
export const getuserCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= ADD TO CART (FIXED FOR MAP) ================= */
export const addtoCart = async (req, res) => {
  try {
const userId = req.user._id; // ✅ ALWAYS THIS
    const { itemId, quantity = 1 } = req.body; // Default quantity to 1

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    let cartData = user.cartData || new Map();

    const id = String(itemId); // Ensure Key is String

    // ✅ FIX: Use .get() and .set() for Mongoose Maps
    if (cartData.has(id)) {
      cartData.set(id, cartData.get(id) + quantity);
    } else {
      cartData.set(id, quantity);
    }

    user.cartData = cartData;
    
    // Explicitly mark as modified just to be safe (though .set usually handles it)
    user.markModified('cartData'); 

    await user.save();

    res.json({ success: true, cartData });
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};


/* ================= UPDATE CART (FIXED FOR MAP) ================= */
export const updateCart = async (req, res) => {
  try {
const userId = req.user._id; // ✅ ALWAYS THIS
    const { itemId, quantity } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || new Map();
    const id = String(itemId);

    // ✅ FIX: Use .set() and .delete()
    if (quantity <= 0) {
      cartData.delete(id);
    } else {
      cartData.set(id, quantity);
    }

    user.cartData = cartData;
    user.markModified('cartData'); // Ensure Mongoose sees the change
    
    await user.save();

    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};