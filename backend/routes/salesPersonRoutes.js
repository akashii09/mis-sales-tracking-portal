const express = require('express');
const router = express.Router();

const salesPersonController = require('../controllers/salesPersonController');

router.post('/add', salesPersonController.addSalesPerson);
router.get('/', salesPersonController.getSalesPersons);
router.put('/:id', salesPersonController.updateSalesPerson);
router.delete('/:id', salesPersonController.deleteSalesPerson);

module.exports = router;