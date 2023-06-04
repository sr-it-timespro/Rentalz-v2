
import mongoose from "mongoose";

const rentalPriceConfigurationSchema = mongoose.Schema({

  configurationName: {
    type: String,
    required: true
  },

  rentalValue: {
    type: Number,
    required: false,
    default: 0
  }
}) 

const rentalProductSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    default: 0
  },

  totalQuantity: {
    type: Number,
    required: true,
    default: 0
  },

  availableQuantity: {
    type: Number,
    required: true,
    default: 0
  },

  refundableDeposit: {
    type: Number,
    required: true,
    default: 0
  },

  deliveryPickupCharges: {
    type: Number,
    required: true,
    default: 0
  },

  rentalPriceConfigurations: [rentalPriceConfigurationSchema]

},

{
  timestamps: true
})

const RentalProduct = mongoose.model('RentalProduct', rentalProductSchema);

export {RentalProduct}