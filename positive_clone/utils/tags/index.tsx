import { FaAnchor, FaRupeeSign, FaTruck } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { ITagList } from "@/modals";
// interface ITagList {
//     icon: IconType,
//     label: string;
//     desciption: string
// }
const tags: ITagList[] = [{
    logo: <FaAnchor color="#ec4899" size={25} />,
    label: "Premium TShirts",
    desciption: "Our TShirts are 100% made up of cotton",
    theme: {
        light: false,
        dark: false
    }
}, {
    logo: <FaTruck color="#ec4899" size={25} />,
    label: "FREE Shipping",
    desciption: "We ship all over India for free",
    theme: {
        light: false,
        dark: false
    }
}, {
    logo: <FaRupeeSign color="#ec4899" size={25} />,
    label: "Exciting Offers",
    desciption: "We provide amazing offers & discounts on our products.",
    theme: {
        light: false,
        dark: false
    }
}]
export default tags;