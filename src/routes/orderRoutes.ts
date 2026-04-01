import express from 'express';
import { createOrder, getMyOrders, getOrderById, cancelOrder } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

export default router;
