
import express from "express";

import {
createOrder, getOrdersForUser
} from "../controller/OrderController.js"

const orderRouter = express.Router();

orderRouter.post("/api/orders", createOrder);
orderRouter.get("/api/myorders/:userId", getOrdersForUser);

export {orderRouter};
