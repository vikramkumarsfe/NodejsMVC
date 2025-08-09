const ProductModel = require("../model/product.model")

const createProduct =  async (req, res)=> {
    try
    {
        const product = await ProductModel.create(req.body)
        res.status(200).json(product)
    }
    catch ( err)
    {
        const msg = err.message
        res.status(500).json({ message : msg})
    }
}

const fetchProduct = async (req, res)=> {
    try
    {
       const products = await ProductModel.find()
       res.status(200).json(products)
    }
    catch ( err)
    {
        const msg = err.message
        res.status(500).json({ message : msg})
    }
}

const updateProduct = async (req, res)=> {
    try
    {
       const { id } = req.params
       const product = await ProductModel.findByIdAndUpdate(id, req.body, { new : true})

       if(!product)
        return res.status(404).json({message : " product not found!!"})

       res.status(200).json(product)
    }
    catch ( err)
    {
        const msg = err.message
        res.status(500).json({ message : msg})
    }
}

const deleteProduct = async(req, res)=> {
    try
    {
       const { id } = req.params
       const product = await ProductModel.findByIdAndDelete(id)

       if(!product)
        return res.status(404).json({message :" product is not found !!"})

       res.status(200).json(product)
    }
    catch ( err)
    {
        const msg = err.message
        res.status(500).json({ message : msg})
    }
}

module.exports = {
    createProduct,
    fetchProduct,
    updateProduct,
    deleteProduct
}

