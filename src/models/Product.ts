import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  isFeatured?: boolean;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
