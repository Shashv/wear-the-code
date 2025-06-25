import { FormatisedList, IShirts, iShirts } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
import ProductModel from "@/modalsmongoose/product";
import UserModel from "@/modalsmongoose/user";
import { Model } from "mongoose";
function getModel(type?: string): Model<unknown | any> {
    switch (type) {
        case "user": return UserModel;
        case "order": return OrdersModel;
        default: return ProductModel
    }
}
let babajiConfiguration: FormatisedList = {}
let babaji: (category: string, skipOffset: number, limitValue: number, page?: number, tyoe?: string) => Promise<{ configuration?: FormatisedList, configurationCount?: number, allRecords?: Array<any> }> = async (category, skipOffset, limitValue, page, tyoe, findAll = null) => {
    if (!findAll && !tyoe) {
        // .skip(skipOffset).limit(limitValue)
        const shirtList = (await ProductModel.find({ category }).lean()).map(shirt => {
            let { title, color, desc, tags, productOrientations, img, category, availableQuantity, size, slug, price } = shirt;
            return {
                title,
                color,
                desc,
                tags: tags || "",
                img,
                productOrientations: productOrientations || "",
                category,
                availableQuantity,
                size,
                slug,
                price
            }
        });
        let babajiConfigurationCount = await ProductModel.find({ category }).countDocuments();
        for (let item of shirtList) {
            const { size, color, ...rest } = item;
            if (item.availableQuantity > 0) {
                if (item.title in babajiConfiguration) {
                    !babajiConfiguration[item.title]["sizes"].includes(item.size) &&
                        babajiConfiguration[item.title]["sizes"].push(item.size);
                    !babajiConfiguration[item.title]["colors"].includes(item.color) &&
                        babajiConfiguration[item.title]["colors"].push(item.color);
                }
                else {
                    babajiConfiguration[item.title] = {
                        sizes: [item.size],
                        colors: [item.color],
                        ...rest
                    }
                }
            }
        }
        let list: FormatisedList = {};
        Object.keys(babajiConfiguration).slice(skipOffset, Number(page || 1) * limitValue).forEach(e => {
            list[e] = babajiConfiguration[e];
        });
        // babajiConfiguration
        return { configuration: list, configurationCount: babajiConfigurationCount };
    }
    else {

        let allRecords = await getModel(tyoe).find();
        return {
            allRecords
        }
    }
}
export default babaji;