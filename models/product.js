import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    price: String,
    description: String,
    category: String,
    image: String,
    rating: { rate: String, count: String },
}, {
    timestamps: true,
}
);


const Product = mongoose.model("Product", productSchema);

export default Product;
