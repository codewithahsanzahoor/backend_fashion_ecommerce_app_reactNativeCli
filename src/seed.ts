import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import { connectDB } from './config/db';

dotenv.config();

const products = [
  {
    name: 'Jacket Jeans',
    price: 49.9,
    category: 'Jacket',
    description: 'Classic denim jacket for a stylish look.',
    image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=687&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#A9B8C5', '#2C3E50'],
    isFeatured: true,
  },
  {
    name: 'Acrylic Sweater',
    price: 34.8,
    category: 'Sweater',
    description: 'Warm and comfortable acrylic sweater.',
    image: 'https://plus.unsplash.com/premium_photo-1669688174622-0393f5c6baa2?q=80&w=764&auto=format&fit=crop',
    sizes: ['M', 'L', 'XL'],
    colors: ['#CB4335', '#D4AC0D'],
    isFeatured: true,
  },
  {
    name: 'Leather Jacket',
    price: 89.9,
    category: 'Jacket',
    description: 'Premium leather jacket for winters.',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L'],
    colors: ['#2C3E50', '#333'],
    isFeatured: false,
  },
  {
    name: 'Stylish Coat',
    price: 65.9,
    category: 'New',
    description: 'Elegant long coat for formal occasions.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#A9B8C5', '#2E86C1'],
    isFeatured: true,
  },
  {
    name: 'Woolen Jacket',
    price: 75.9,
    category: 'Jacket',
    description: 'Soft woolen jacket for extreme cold.',
    image: 'https://images.unsplash.com/photo-1617662408044-cda3ab7134c9?w=800&auto=format&fit=crop',
    sizes: ['M', 'L'],
    colors: ['#27AE60', '#2C3E50'],
    isFeatured: false,
  },
  {
    name: 'Casual Sweater',
    price: 45.9,
    category: 'Sweater',
    description: 'Lightweight casual sweater for daily wear.',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L'],
    colors: ['#D4AC0D', '#CB4335'],
    isFeatured: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products removed');

    // Insert new products
    await Product.insertMany(products);
    console.log('Database Seeded Successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

seedDatabase();
