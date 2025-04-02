const express = require('express');
const { 
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// POST - create a new order
router.post('/', protect, createOrder);

// GET - get all orders (admin only)
router.get('/', protect, admin, getOrders);

// GET - get logged in user orders
router.get('/myorders', protect, getMyOrders);

// GET - get order by ID
router.get('/:id', protect, getOrderById);

// PUT - update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

// PUT - update order to delivered (admin only)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router; 