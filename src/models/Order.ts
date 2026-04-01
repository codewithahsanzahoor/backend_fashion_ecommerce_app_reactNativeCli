import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    address: string;
    label: string;
    phone: string;
  };
  paymentMethod: string;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      label: { type: String },
      phone: { type: String },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
