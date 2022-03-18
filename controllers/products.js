const Products = require('../models/products');
const { response } = require('express');


const crearProduct = async(req, res = response) => {

    const {
        id,
        name,
        price,
        mrp,
        stock,
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

         return res.status(201).json({
             ok: true,
             msg: 'Creado ok',
             dbProducto
         });



        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar'
        });
    }
}


const getProducts = async(req, res = response) => {

    console.log('klo');

    const all = await Products.findAll();

    if( !all ) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron productos'
        });
    }

    return res.status(200).json({
        ok: true,
        all
    });

}

const deletePutProducts = (req, res = response) => {

    const Id = req.params.id;

    return res.status(405).json({
        ok: false,
        msg: 'No se permite borrar ni modificar productos'
    });

}

module.exports = {
    crearProduct,
    getProducts,
    deletePutProducts
}