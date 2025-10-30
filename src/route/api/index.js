const express = require('express');
const router = express.Router();
const auth = require('./auth');
const banner = require('./banner');
const category = require('./category');
const subcategory = require('./subcategory');
const products = require('./products');

router.use('/auth', auth);
router.use('/banner', banner);
router.use('/category', category);
router.use('/subcategory', subcategory);
router.use('/products', products);

module.exports = router;