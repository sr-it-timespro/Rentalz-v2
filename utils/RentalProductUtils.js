
import {RentalProduct} from "../models/RentalProductModel.js"

const updateProductQuantity = async (productId, exhaustedQuantity) => {

    console.log(`Product ID is ${productId}`);
  
    try{
    
      const product = await RentalProduct.findById(productId);
      console.log(`Existing Product is ${product}`);
  
      if (product){
  
        console.log(`Quantity value is ${exhaustedQuantity}`);
  
        let newQuantity = product.availableQuantity - exhaustedQuantity;
        console.log(`New Quantity value is ${newQuantity}`);
  
        const result = await RentalProduct.updateOne({_id: productId}, {
          '$set' : {
            "availableQuantity" : newQuantity 
          }
        })
        console.log(`Product Updated ${result}`);  
        
        return result;
      }
    }catch (error){
  
      console.log(error);
      throw new Error (`Update Quantity failed for product - ${productId}`);
    } 
  }

  export {updateProductQuantity}