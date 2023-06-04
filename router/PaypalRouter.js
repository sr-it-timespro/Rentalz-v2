
import express from "express";

import {
getPaypalConfiguration
} from "../controller/PaypalController.js"

const paypalRouter = express.Router();

paypalRouter.get("/api/rentalproducts/paypal/configuration", getPaypalConfiguration);

export {paypalRouter};
