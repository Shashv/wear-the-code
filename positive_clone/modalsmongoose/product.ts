import { IProductModel } from "@/modals";
import mongoose, { Document, Model, Schema } from "mongoose";
// uncomment the below link to use the con,nection string with mongodb without using the callback function../
mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const ProductSchema = new mongoose.Schema<IProductModel>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    productOrientations: { type: String, default: "" },
    tags: { type: String, default: "" }
}, { timestamps: true });
let ProductModel: Model<IProductModel>;
if (mongoose.models && mongoose.models.Products) {
    ProductModel = mongoose.models.Products;
}
else {
    ProductModel = mongoose.model("Products", ProductSchema);
}
export default ProductModel;