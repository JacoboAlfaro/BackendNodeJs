const express = require('express')
const dealershipController = require('../controllers/DealershipController')
const router = express.Router()

router.post('/new-dealership', dealershipController.createDealershhip)
router.get('/', dealershipController.getDealerships)
router.get('/:id', dealershipController.getDealershipById)
router.patch('/edit/:id', dealershipController.updateDealershipById)
router.delete('/remove/:id', dealershipController.deleteDealershipById)

module.exports = router;
