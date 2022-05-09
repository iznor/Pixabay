const { Router } = require('express');
const { pixaController } = require('../controllers/pixaController');
const pixaRouter = new Router();


pixaRouter.get('/:category/:page', pixaController.getByCategory);


module.exports = { pixaRouter };