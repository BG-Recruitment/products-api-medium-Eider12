const Products = require('../models/products');
const { response } = require('express');


const crearProduct = async(req, res = response) => {

    const {
        isPublished
    } = req.body;


    try {

        // Crear el Producto En BD
        const dbProducto = new Products( req.body );
        if( isPublished ) {
            dbProducto.isPublished = false;
        } else {
            dbProducto.isPublished = false;
        }

         await dbProducto.save();

         return res.status(201).json(
             dbProducto
         );
 
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar'
        });
    }
}


const getProducts = async(req, res = response) => {

    const all = await Products.findAll();

    if( !all ) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron productos'
        });
    }

    return res.status(200).json(
        all
    );

}

const deletePutProducts = (req, res = response) => {

    const Id = req.params.id;

    return res.status(405).json({
        ok: false,
        msg: 'No se permite borrar ni modificar productos'
    });

}

const patchProducts = async (req, res = response) => {

    const ID = req.params.id;
    const { isPublished } = req.body;

    const produtcId = await Products.findByPk(ID);

    if( !produtcId ) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron productos con ese ID'
        });
    } else if

     ( produtcId.mrp >= produtcId.price && produtcId.stock > 0){

        await Products.update({
            isPublished: isPublished
         }, {
             where: {
                 id: ID
             }
         });

          res.status(204).send();
    } 
     if ( produtcId.mrp < produtcId.price && produtcId.stock <= 0){
            return res.status(422).json([
                'MRP should be less than equal to the Price',
                'Stock count is 0'
            ]);
        }

         if( !(produtcId.mrp >= produtcId.price) && produtcId.stock > 0 ){
        return res.status(422).json([
            'MRP should be less than equal to the Price'
        ]);
    }

     if( !(produtcId.stock > 0) && produtcId.mrp >= produtcId.price ){
        return res.status(422).json([
            'Stock count is 0'
        ]);
    }

}

module.exports = {
    crearProduct,
    getProducts,
    deletePutProducts,
    patchProducts
}