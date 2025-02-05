import mongoose, { Model, models, mongo } from "mongoose";

// mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        id: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: "pending", required: true }
}, { timestamps: true });
let OrdersModel: Model<any>;
if (mongoose.models && mongoose.models.Orders) {
    OrdersModel = mongoose.models.Orders;
}
else {
    OrdersModel = mongoose.model("Orders", OrderSchema);
}
export default OrdersModel;