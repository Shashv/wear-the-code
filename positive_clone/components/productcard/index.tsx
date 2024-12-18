import React from "react";
import { Card } from "react-bootstrap";
import style from "./index.module.css";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { FaRupeeSign } from "react-icons/fa";
import { IProductType } from "@/pages/tShirts";
import ColorLabel from "../colorLabels";
type IBest = {
    thumnail: string;
    image: string;
    label: string;
    category: string;
    price: number | any;
    priceoriginal: number;
    variations?: {
        color: string[];
        size: string[];
    },

}
const ProductCard: React.FC<IProductType> = ({ desc, title, sizes, category, slug, availableQuantity, price, colors, type, img }) => {
    let theme = useSelector((state: IState) => state.toggletheme);
    let [hover, setHover] = React.useState<boolean>(false);
    React.useEffect(() => {
    }, [hover]);
    return (
        <>
            <Card className={theme.dark ? style.productCard : style.lightcard}>
                <div className={theme.dark ? (!hover ? `cursor-pointer position-relative ${style.imageholderdark}` : `cursor-pointer position-relative ${style.activeHolderdark}`) : (!hover ? `cursor-pointer position-relative ${style.imageholderlight}` : `cursor-pointer position-relative ${style.activeHolderlight}`)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <img className={!hover ? `${style.imageDisplay} w-[89%] h-100` : `${style.imagehide} w-[100%] h-100`} src={img} />
                    <img className={hover ? `${style.imageDisplay} w-[100%] h-100` : `${style.imagehide} h-100 w-[100%] mx-auto`} src={`/codeswearcircle.png`} />
                </div>
                <div className={style.cardfooter}>
                    <Typography className="" color={theme.light ? "#000" : "#9ca3af"} variant={"subtitle1"}>
                        {"Tshirt"}
                    </Typography>
                    <Typography className={style.labeltext} color={theme.light ? "#000" : "#fff"} fontWeight={"bold"} variant={"subtitle1"}>
                        {title}
                    </Typography>
                    <div className="d-flex align-items-center justify-between">
                        <div className="color-variants flex align-center gap-1">
                            {colors?.map((colorValue, index) =>
                                <>
                                    <ColorLabel key={index} hexcode={colorValue} />
                                </>
                            )}
                        </div>
                        <div className="price-section d-flex align-items-center">
                            <div color={theme.light ? "#000" : "gray"} className="text-decoration-line-through d-flex align-items-center">
                                <span className="h-fit">
                                    <FaRupeeSign size={15} color={theme.light ? "#000" : "#fff"} />
                                </span>
                                <span className={theme.light ? "text-gray-400" : "text-light"}>
                                    {1100}
                                </span>
                            </div>
                            {/* - */}
                            <div color={theme.light ? "#000" : "#fff"} className="d-flex align-items-center">
                                <span className="h-fit">
                                    <FaRupeeSign size={15} color={theme.light ? "#000" : "#fff"} />
                                </span>
                                <span className={theme.light ? "text-muted" : "text-light"}>
                                    {100}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="available-sizes flex align-center justify-start gap-1 w-100">
                        {sizes?.map((size, index) => <span className={theme.dark ? style.sizelabel : style.sizelabellight} key={index}>{size}</span>)}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default ProductCard;
