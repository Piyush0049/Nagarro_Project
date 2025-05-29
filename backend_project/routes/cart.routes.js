import express from "express";
import {
  increaseQuantity,
  deleteItem,
  placeCartOrder,
  getCartItemQuantities,
} from "../controllers/cart.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/", isAuthenticated, getCartItemQuantities);
router.post("/increase", isAuthenticated, increaseQuantity);
router.post("/delete", isAuthenticated, deleteItem);
router.post("/order", isAuthenticated, placeCartOrder);

export default router;
