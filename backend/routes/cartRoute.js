import express from "express";
import {
  addtoCart,
  updateCart,
  getuserCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", authUser, getuserCart);
cartRouter.post("/add", authUser, addtoCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
