import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Add shipping address
// @route   POST /api/user/address
// @access  Private
export const addShippingAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id);

    if (user) {
      const { id, label, address, phone } = req.body;
      const newAddress = { id, label, address, phone };

      user.shippingAddresses = user.shippingAddresses || [];
      user.shippingAddresses.push(newAddress);

      await user.save();

      res.status(201).json(user.shippingAddresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete shipping address
// @route   DELETE /api/user/address/:id
// @access  Private
export const deleteShippingAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id);

    if (user && user.shippingAddresses) {
      user.shippingAddresses = user.shippingAddresses.filter(
        (address) => address.id !== req.params.id
      );

      await user.save();

      res.json(user.shippingAddresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add payment method
// @route   POST /api/user/payment
// @access  Private
export const addPaymentMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id);

    if (user) {
      const { id, label, icon, last4 } = req.body;
      const newPaymentMethod = { id, label, icon, last4 };

      user.paymentMethods = user.paymentMethods || [];
      user.paymentMethods.push(newPaymentMethod);

      await user.save();

      res.status(201).json(user.paymentMethods);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/user/payment/:id
// @access  Private
export const deletePaymentMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id);

    if (user && user.paymentMethods) {
      user.paymentMethods = user.paymentMethods.filter(
        (method) => method.id !== req.params.id
      );

      await user.save();

      res.json(user.paymentMethods);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
