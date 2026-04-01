import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    if (items && items.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear cart after order is created
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order && (order.user as any)._id.toString() === req.user.id) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order && (order.user as any).toString() === req.user.id) {
      if (order.status === 'Pending') {
        order.status = 'Cancelled';
        await order.save();
        res.json(order);
      } else {
        res.status(400).json({ message: 'Order cannot be cancelled in current status' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
