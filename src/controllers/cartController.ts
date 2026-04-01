import { Response } from 'express';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/authMiddleware';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ productId, quantity, size, color }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ productId, quantity: quantity || 1, size, color });
      }
      await cart.save();
    }

    const updatedCart = await Cart.findById(cart.id).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCartItemQuantity = async (req: AuthRequest, res: Response) => {
  const { productId, size, color, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        const updatedCart = await Cart.findById(cart.id).populate('items.productId');
        return res.json(updatedCart);
      }
    }
    res.status(404).json({ message: 'Cart item not found' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  const { productId, size, color } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) =>
          !(item.productId.toString() === productId &&
            item.size === size &&
            item.color === color)
      );
      await cart.save();
      const updatedCart = await Cart.findById(cart.id).populate('items.productId');
      return res.json(updatedCart);
    }
    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
