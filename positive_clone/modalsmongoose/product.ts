import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true }
}, { timestamps: true });
let ProductModel: any = "";
if (mongoose.models && mongoose.models.Products) {
    ProductModel = mongoose.models.Products;
}
else {
    ProductModel = mongoose.model("Products", ProductSchema);
}
export default ProductModel;