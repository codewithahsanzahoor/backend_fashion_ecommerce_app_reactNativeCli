import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  stripeCustomerId?: string;
  shippingAddresses?: {
    id: string;
    label: string;
    address: string;
    phone: string;
  }[];
  paymentMethods?: {
    id: string;
    label: string;
    icon?: string;
    last4?: string;
  }[];
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    stripeCustomerId: { type: String },
    shippingAddresses: [
      {
        id: { type: String },
        label: { type: String },
        address: { type: String },
        phone: { type: String },
      },
    ],
    paymentMethods: [
      {
        id: { type: String },
        label: { type: String },
        icon: { type: String },
        last4: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
