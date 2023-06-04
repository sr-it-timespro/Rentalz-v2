
// import rental_products from "./SampleData/SampleRentalProducts.js"
import express from "express";
import dotenv from "dotenv";
import {connectToDB} from "./utils/DBUtils.js"
import path from 'path'

import {rentalProductRouter} from "./router/RentalProductRouter.js"
import {paypalRouter} from "./router/PaypalRouter.js";
import {userRouter} from "./router/UserRouter.js"
import {orderRouter} from "./router/OrderRouter.js"

dotenv.config();
connectToDB();

const app = express();


app.use(express.json())

app.use(rentalProductRouter)
app.use(paypalRouter)
app.use(userRouter);
app.use(orderRouter);


const __dirname = path.resolve()
console.log(`Dir Name is ${__dirname}`)

if (process.env.NODE_ENV === 'production') {

  const path2 = path.join(__dirname, '/build');
  console.log(`Path2 is ${path2}`);

  app.use(express.static(path2));

  app.get('*', (req, res) => {

    console.log('Serving index.htmml');
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  }
  )
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started and running in port ${PORT}`);
})
