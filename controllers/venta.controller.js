const VentasSchema = require('../models/venta')

const { validationResult } = require('express-validator');


const getVentas = async (req,res) => {
    try{ 
        let ventas = await VentasSchema.find();
       
        res.status(200).json({ data: ventas });
       }
    
    catch (err){
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
                    }
                            })
             }       
}


const createVenta = async (req,res) =>  {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }
    
    let venta =new VentasSchema(req.body);
    
    try{ 
        await venta.save();
        
        res.status(201).json({ data: venta });
       }
    catch (err){
        res.status(404).json({
            error: {
                code: 404,
                message: "Problemas con la base de datos" + err.message
            }
        })
    }
}

const updateVenta = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                code: 404,
                errors: errors.array()
            }
        });
    }

     
        try{ 
            let nuevaVenta = {
                id: req.params.id,
                fecha: req.body.fecha,
                valor: req.body.valor,
                cantidadProd: req.body.cantidadProd,
                documentoCLiente: req.body.documentoCLiente,
                nombreCliente: req.body.nombreCliente, 
                nombreVendedor: req.body.nombreVendedor,
                documentoVendedor: req.body.documentoVendedor
            }
            await VentasSchema.findByIdAndUpdate(req.params.id, nuevaVenta);
            res.status(201).json({ data: nuevaVenta });
           }
        
        catch (err){
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Id no encontrado"
                }
            })
        }
    
}

const deleteVenta = async (req,res) => {
    if (req.params.id != 'undefined') {
        try {
            let resultado = await VentasSchema.findByIdAndRemove(req.params.id)
            res.status(200).json({ data: resultado });
        }
        catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Producto no encontrado"
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                code: 404,
                message: "Id no encontrado"
            }
        })
    }
}


module.exports.getVentas = getVentas;
module.exports.createVenta = createVenta;   
module.exports.updateVenta = updateVenta;  
module.exports.deleteVenta = deleteVenta;