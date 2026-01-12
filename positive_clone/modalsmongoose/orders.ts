import mongoose, { Model, models, mongo } from "mongoose";
interface IUser extends Document {
    userId: string;
    email?: string;
    products: Array<{ id: string; quantity: number }>;
    orderId: string;
    paymentInfo: string;
    address: string;
    totalAmount: number;
    orderStatus: string;
}
// uncomment the  below link to use connection string connection with mongodb without using the callback...//
//added order id, payment info to the mongodb table//..
mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const OrderSchema = new mongoose.Schema<IUser>({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: [{
        id: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: "Initiated", required: true }
}, { timestamps: true });
let OrdersModel: Model<IUser>;
if (mongoose.models && mongoose.models.Orders) {
    OrdersModel = mongoose.models.Orders;
}
else {
    OrdersModel = mongoose.model("Orders", OrderSchema);
}
export default OrdersModel;