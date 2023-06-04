import mongoose from "mongoose";

const paypalPaymentOutcomeSchema = mongoose.Schema({

  paymentOutcome: {
    type: Object,
    required: true
  },

},
  {
    timestamps: true
  }

)

const PaypalPaymentOutcome = mongoose.model('PaypalPaymentOutcome', paypalPaymentOutcomeSchema);

export { PaypalPaymentOutcome };
