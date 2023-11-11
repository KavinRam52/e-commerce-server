import Product from "../models/product.js";

// Create Products

export const createProduct = (req, res) => {
    new Product(req.body)
        .save()
        .then((product) => res.status(201).json({ success: true, messgae: 'New product successfully added', product: product }))
        .catch((error) => res.status(400).json({ success: false, message: `Something Went Wrong!` }));
};


// getAllProducts
export const getAllProducts = (req, res) => {
    Product.find()
        .then((products) => res.status(201).json({ success: true, messgae: "Success", products: products }))
        .catch((error) => res.status(400).json({ success: false, message: `No products found with this ${id}` }));

};






// getSingleProducts
export const getSingleProduct = (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then((product) => res.status(201).json({ success: true, message: `Product with the ${id} found`, product: product }))
        .catch((error) => res.status(400).json({ success: false, message: `No products found with this ${id}` }));
};

// update products


export const updateProduct = (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    Product.findByIdAndUpdate(id, {
        title: newData.title,
        price: newData.price,
        description: newData.description,
        category: newData.category,
        image: newData.image,
        rating: { rate: newData.rate, count: newData.count },
    }, { new: true })
        .then((updatedProduct) => res.status(201).json({ success: true, message: 'Product Updated Successfully', updatedproduct: updatedProduct }))
        .catch((error) => res.status(400).json({ success: false, message: `No products found with this ${id}` }));
};


// delete products

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then((deletedProduct) => res.status(200).json({ success: true, message: 'Product deleted successfully', deletedProduct: deletedProduct }))
        .catch((error) => res.status(400).json({ success: false, message: `No products found with this ${id}` }));
}


