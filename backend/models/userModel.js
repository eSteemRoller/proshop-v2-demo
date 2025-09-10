
import mongoose from "mongoose";
// import { bcrypt } from "globalthis/implementation"; ?
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        primaryBillingAddress: {
            type: String,
            required: true,
        },
        primaryShipppingAddress: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.verifyPassword = async function (enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) { 
  if (!this.isModified('password')) { 
    next();
  }
  const pwSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, pwSalt);
});

const User = mongoose.model("User", userSchema);

export default User;