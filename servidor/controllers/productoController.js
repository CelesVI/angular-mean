const Producto = require("../models/Producto");

exports.crearProducto = async (req,res) => {
    
    try{
        let producto;
        producto = new Producto(req.body)
        await producto.save()
        res.send(producto)
    } catch(e){
        console.log(e);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProductos = async (req,res) => {
    
    try{
        const productos = await Producto.find();
        res.json(productos)
    } catch(e){
        console.log(e);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProducto = async (req,res) => {
    
    try{
        const producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ mas: 'No existe el producto'});
        }
        res.json(producto)
    } catch(e){
        console.log(e);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarProducto = async (req,res) => {
    
    try{
        const producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ mas: 'No existe el producto'});
        }
        await Producto.findByIdAndRemove({_id: req.params.id})
        res.json({msj: "Producto eliminado exitosamente"})
    } catch(e){
        console.log(e);
        res.status(500).send('Hubo un error')
    }
}


exports.actualizarProductos = async (req,res) => {
    
    try{
        const {producto, categoria, ubicacion, precio} = req.body;
        let product = await Producto.findById(req.params.id);
        if(!product){
            res.status(404).json({ mas: 'No existe el producto'});
        }

        product.producto = producto;
        product.categoria = categoria;
        product.ubicacion = ubicacion;
        product.precio = precio;

        product = await Producto.findByIdAndUpdate( {_id: req.params.id}, product, {new:true})
        res.json(product);

    } catch(e){
        console.log(e);
        res.status(500).send('Hubo un error')
    }
}