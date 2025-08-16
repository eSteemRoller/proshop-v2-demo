
import mongoose from "mongoose";
// import { bcrypt } from "globalthis/implementation"; ?
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
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