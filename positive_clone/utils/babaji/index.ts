import { FormatisedList, IShirts, iShirts } from "@/modals";
import ProductModel from "@/modalsmongoose/product";

let babajiConfiguration: FormatisedList = {}
let babaji: (category: string, skipOffset: number, limitValue: number) => Promise<{ [key: string]: iShirts }> = async (category, skipOffset, limitValue) => {
    const shirtList = await (await ProductModel.find({ category }).skip(skipOffset).limit(limitValue).lean()).map(shirt => {
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
    return babajiConfiguration;
}
export default babaji;