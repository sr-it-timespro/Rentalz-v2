import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
    {
        userReference: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        orderItems: [
            {
                productReference: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: { type: Number, required: true },
                bookingDates: {
                    startDate: { type: Date, required: true, default: Date.now() },
                    endDate: { type: Date, required: true, default: Date.now() }
                },
            },
        ],

        shippingAddressDetails: {
            shippingAddress: { type: String, required: true },
            landmarkDetails : {type : String},
            contactNo : {type : String},
            deliveryInstructions : {type : String},
        },

        pricingDetails : {

            totalRentalCharges: {
                type: Number,
                required: true,
                default: 0.0,
            },
    
            totalRefundableDeposit: {
                type: Number,
                required: true,
                default: 0.0,
            },
    
            totalDeliveryPickupCharges: {
                type: Number,
                required: true,
                default: 0.0,
            },
    
            totalServiceTax: {
                type: Number,
                required: true,
                default: 0.0,
            },
    
            grandTotal: {
                type: Number,
                required: true,
                default: 0.0,
            },    
        },

        paymentOutcome: {
            type: { type: String, required: true },
            reference: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'PaypalPaymentOutcome',
            },
        },

        paymentDate: {
            type: Date,
        },

        status: { type: String, required: true },

    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

export {Order}
