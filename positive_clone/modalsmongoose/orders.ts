import mongoose, { mongo } from "mongoose";
const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        id: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: "pending", required: true }
}, { timestamps: true })
const ordersModel = mongoose.model("Orders", OrderSchema);
export default ordersModel;