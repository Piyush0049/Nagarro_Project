import express from "express";
import {
  register,
  login,
  logout,
  addAddress,
  getAddress,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);


router.post("/address", isAuthenticated, addAddress);
router.post("/alladdress", isAuthenticated, getAddress);

export default router;
