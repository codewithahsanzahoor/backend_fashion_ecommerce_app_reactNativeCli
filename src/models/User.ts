import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  shippingAddresses?: {
    id: string;
    label: string;
    address: string;
    phone: string;
  }[];
  paymentMethods?: {
    id: string;
    label: string;
    type: string;
    details: string;
  }[];
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
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
        type: { type: String },
        details: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
