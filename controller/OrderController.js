
import {Order} from "../models/OrderModel.js"
import {PaypalPaymentOutcome} from "../models/PaypalPaymentOutcomeModel.js";
import { updateProductQuantity } from "../utils/RentalProductUtils.js";

const createOrder = async (req, res) => {

    try{

        console.log('Req.Body ');
        console.log(JSON.stringify(req.body));

        const paypalOutcome = await storePaypalResponse(req.body);
        const createdOrder = await createNewOrder(req.body, paypalOutcome);

        console.log(`Created new order ${createdOrder}`)

        createdOrder.orderItems.map( async (orderItem) => {

            const productId = orderItem.productReference;
            const exhaustedQuantity = orderItem.quantity;

            const outcome = await updateProductQuantity(productId, exhaustedQuantity);
            console.log(`Product Updated ${outcome}`);

        })
        res.status(201);
        res.json(createdOrder);

    }catch (error){
        console.log(error);
        res.status(404);
        res.json({
            message: error
        })
    }
}

const storePaypalResponse = async (reqBody) => {


    const paypalOutcome = new PaypalPaymentOutcome({
        paymentOutcome : reqBody.paymentOutcome
    })

    try{
        const createdPaypalOutcome = await paypalOutcome.save()
        return createdPaypalOutcome;
    }catch (error){
        console.log(error);
        throw new Error("Error while storing paypal response");
    }
}

const createNewOrder = async (reqBody, paypalOutcome) => {

    const {userReference, orderItems, shippingAddressDetails, pricingDetails, paymentDate} = reqBody;

    if (orderItems && orderItems.length === 0) {

        throw new Error("No order items present");
    } else {

        try{

            const newOrder = new Order({

                userReference : userReference,
                orderItems : orderItems,
                shippingAddressDetails : {
                    shippingAddress: shippingAddressDetails.shippingAddress,
                    landmarkDetails : shippingAddressDetails.landmarkDetails,
                    contactNo : shippingAddressDetails.contactNo,
                    deliveryInstructions : shippingAddressDetails.deliveryInstructions
                },

                pricingDetails : pricingDetails,
                paymentOutcome : {
                    type: 'PAYPAL',
                    reference: paypalOutcome._id,
                },
                paymentDate : paymentDate,
                status: paypalOutcome.paymentOutcome.status
            })
            
            console.log('New Order Object is');
            console.log(JSON.stringify(newOrder));

            const createdOrder = await newOrder.save()
            return createdOrder;
        }catch (error){
            console.log(error);
            throw new Error("Error while creating the order");            
        }    
    }
}


const getOrdersForUser = async (req, res) => {

    console.log('My Orders invoked ')

    try{

        const userId = req.params.userId
        console.log(`User ID is ${userId}`);

        const userOrders = await Order.find({ userReference: userId  })
        res.json(userOrders)    
    }catch(error){
        console.log(error);
        res.status(404);
        res.json({
            message: error
        })
    }

}

export {createOrder, getOrdersForUser}