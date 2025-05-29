import express from "express";
import {
  getItem,
  getItemsByTag,
  getItemsByCategory,
  getItemsByTagAndCategory,
  addItem,
  addToCart,
} from "../controllers/item.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();


router.get("/", getItem);
router.get("/tags", getItemsByTag);
router.get("/categories", getItemsByCategory);
router.get("/filter", getItemsByTagAndCategory);


router.post("/add", addItem);


router.post("/add-to-cart", isAuthenticated, addToCart);

export default router;
