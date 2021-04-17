const express = require('express');
const { body } = require('express-validator');

const AdminController = require('../controllers/admin-controller');
const isAuth = require('../middlewares/is-auth');

const adminRouter = express.Router();

// /admin/add-product => GET
adminRouter.get('/add-product', isAuth, AdminController.getAddProduct);

// /admin/products => GET
adminRouter.get('/products', isAuth, AdminController.getProducts);

// /admin/add-product => POST
adminRouter.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  AdminController.postAddProduct,
);

adminRouter.get('/edit-product/:productId', isAuth, AdminController.getEditProduct);

adminRouter.post(
  '/edit-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  AdminController.postEditProduct,
);

adminRouter.delete('/products/:productId', isAuth, AdminController.deleteProduct);

module.exports = adminRouter;
