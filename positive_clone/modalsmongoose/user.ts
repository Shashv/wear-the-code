import mongoose, { Document, Model, Schema } from "mongoose";
import { ISchema } from "@/modals";
import { connectMongoose } from "@/utils/connectMongoose";
//uncomment the below link to use mongo// without call backk...//
mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema = new Schema<ISchema>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true }
});

let UserModel: Model<ISchema>;

if (mongoose.models && mongoose.models.User) {
    UserModel = mongoose.models.User;
}
else {
    UserModel = mongoose.model("User", userSchema);
}
export default UserModel;  