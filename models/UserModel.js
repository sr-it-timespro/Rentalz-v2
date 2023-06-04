import bcrypt from "bcryptjs";

import mongoose from "mongoose";

const userSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
},
  {
    timestamps: true
  }

)

userSchema.methods.matchPassword = async function (enteredPassword) {

  console.log(`Entered password is ${enteredPassword}`);
  console.log(`This.password is ${this.password}`);

  const outcome = await bcrypt.compare(enteredPassword, this.password)
  console.log(`Outcome is ${outcome}`);

  return outcome;
}


const User = mongoose.model('User', userSchema);

export { User };
