
import express from "express";

import {
  getRentalProducts,
  getRentalProductById,
  updateQuantity
} from "../controller/RentalProductController.js"

const rentalProductRouter = express.Router();

rentalProductRouter.get("/api/rentalproducts", getRentalProducts);
rentalProductRouter.get("/api/rentalproducts/:productId", getRentalProductById);
// rentalProductRouter.get("/api/rentalproducts/updateQuantity", updateQuantity);


export {rentalProductRouter};