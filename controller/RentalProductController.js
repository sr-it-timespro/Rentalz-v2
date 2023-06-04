
import {RentalProduct} from "../models/RentalProductModel.js";
import {updateProductQuantity} from "../utils/RentalProductUtils.js"

const getRentalProducts = async (req, res) => {

  try{
    const rentalProducts = await RentalProduct.find({})
    res.json(rentalProducts);  
  }catch (error){

    console.log(error);

    res.status(404);
    res.json({
        message: error
    })
  }
}

const getRentalProductById = async (req, res) => {

  const productId = req.params.productId;
  console.log(`Product ID is ${productId}`);

  try{
    const rentalProduct = await RentalProduct.findById(productId);
    res.json(rentalProduct);
  }catch (error){
    console.log(error);

    res.status(404);
    res.json(
      {
        message: `Unable to retrive the product details - ${productId}`
      }
    )
  }

}

const updateQuantity = async (req, res) => {

  const productId = req.body.productId;
  console.log(`Product ID is ${productId}`);

  const exhaustedQuantity = req.body.quantity;
  console.log(`Quantity value is ${exhaustedQuantity}`);

  try{
    updateProductQuantity(productId, exhaustedQuantity);
  }catch (error){

    console.log(error);
    res.status(404);
    res.json({
      message: error
    })
  }


}

export {getRentalProducts, getRentalProductById, updateQuantity};