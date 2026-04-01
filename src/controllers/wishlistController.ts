import { Response } from 'express';
import Wishlist from '../models/Wishlist';
import { AuthRequest } from '../middleware/authMiddleware';

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const toggleWishlist = async (req: AuthRequest, res: Response) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      });
    } else {
      const productIndex = wishlist.products.findIndex(
        (id) => id.toString() === productId
      );

      if (productIndex > -1) {
        wishlist.products.splice(productIndex, 1);
      } else {
        wishlist.products.push(productId as any);
      }
      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findById(wishlist.id).populate('products');
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
