import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  addShippingAddress,
  deleteShippingAddress,
  addPaymentMethod,
  deletePaymentMethod,
} from '../controllers/userController';

const router = express.Router();

router.post('/address', protect, addShippingAddress);
router.delete('/address/:id', protect, deleteShippingAddress);

router.post('/payment', protect, addPaymentMethod);
router.delete('/payment/:id', protect, deletePaymentMethod);

export default router;
