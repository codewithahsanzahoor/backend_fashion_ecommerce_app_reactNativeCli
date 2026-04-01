import express from 'express';
import { getCart, addToCart, updateCartItemQuantity, removeFromCart } from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCartItemQuantity);
router.post('/remove', protect, removeFromCart);

export default router;
