const express = require('express');
const router = express.Router();

const targetController = require('../controllers/targetController');

router.post('/add', targetController.addTarget);
router.get('/', targetController.getTargets);
router.put('/:id', targetController.updateTarget);
router.delete('/:id', targetController.deleteTarget);

module.exports = router;