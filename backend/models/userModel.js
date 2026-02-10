import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// import { bcrypt } from "globalthis/implementation"; Research the diff

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
    bizName: {
      type: String,
      required: false,
    },
    primaryEmail: {
      type: String,
      required: true,
    },
    secondaryEmail: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    primaryPhone: {
      type: String,
      required: false,
    },
    secondaryPhone: {
      type: String,
      required: false,
    },
    // primaryBillingAddress: {
    //   type: String,
    //   required: false,
    // },
    // secondaryBillingAddress: {
    //   type: String,
    //   required: false,
    // },
    // primaryShippingAddress: {
    //   type: String,
    //   required: false,
    // },
    // secondaryShippingAddress: {
    //   type: String,
    //   required: false,
    // },
    isSubscribedToEmail: {
      type: Boolean,
      default: false,
    },
    isSubscribedToText: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // role: {
    //   type: String,
    //   enum: [
    //     "User", 
    //     "Admin", 
    //     "Affiliate",
    //     "Supplier, B2G (we buy from)", 
    //     "Supplier, B2B (we buy from)", 
    //     "Supplier, B2C (we buy from)", 
    //     "Client, B2G (we sell to)",
    //     "Client, B2B (we sell to)",
    //     "Client, B2C (we sell to)"
    //   ],
    //   required: true,
    //   default: "user",
    // },
    adminNotes: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const pwSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, pwSalt);
});

const User = mongoose.model("User", userSchema);

export default User;