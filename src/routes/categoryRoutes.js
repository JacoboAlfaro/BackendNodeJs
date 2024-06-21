const express = require('express')
const categoryController = require('../controllers/CategoryController')
const router = express.Router();

router.post('/new-category', categoryController.createCategory)
router.get('/', categoryController.getCategories)

module.exports = router