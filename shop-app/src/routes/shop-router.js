const express = require('express');

const shopController = require('../controllers/shop-controller');
const isAuth = require('../middlewares/is-auth');

const shopRouter = express.Router();

shopRouter.get('/', shopController.getIndex);

shopRouter.get('/products', shopController.getProducts);

shopRouter.get('/products/:productId', shopController.getProduct);

shopRouter.get('/cart', isAuth, shopController.getCart);

shopRouter.post('/cart', isAuth, shopController.postCart);

shopRouter.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

shopRouter.post('/create-order', isAuth, shopController.getCheckoutSuccess);

// shopRouter.get('/checkout', isAuth, shopController.getCheckout);

// shopRouter.get('/checkout/success', shopController.getCheckoutSuccess);

// shopRouter.get('/checkout/cancel', shopController.getCheckout);

shopRouter.get('/orders', isAuth, shopController.getOrders);

shopRouter.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = shopRouter;
