import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleWare, placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.post("/userorders", authMiddleWare, userOrders);
orderRoute.get("/list", listOrders);
orderRoute.post("/status", updateStatus);

export default orderRoute;
