var express = require('express');
const { crearProduct, getProducts, deletePutProducts, patchProducts } = require('../controllers/products');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>HTML Datap</p>');
});





// Crear Producto
router.post('/products', crearProduct);


// Tarer Productos
router.get('/products', getProducts);

// Borrar Producto
router.delete('/products/:id', deletePutProducts);

// Put Producto
router.put('/products/:id', deletePutProducts);

//Patch Product
router.patch('/products/:id', patchProducts );



module.exports = router;
