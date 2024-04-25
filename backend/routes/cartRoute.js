import express from "express";
import {
  addIoCart,
  getCart,
  removeFromcart,
} from "../controllers/cartController.js";
import authMiddleWare from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleWare, addIoCart);

cartRoute.post("/remove", authMiddleWare, removeFromcart);

cartRoute.post("/get", authMiddleWare, getCart);

export default cartRoute;
