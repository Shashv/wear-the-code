import React from "react";
import { Card } from "react-bootstrap";
import style from "./index.module.css";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { IState } from "@/pages/redux/sore";
import { FaRupeeSign } from "react-icons/fa";
import { IProductType } from "@/pages/tShirts";
import ColorLabel from "../colorLabels";
type IBest = {
    thumnail: string;
    image: string;
    // hoverImage?: string;
    label: string;
    category: string;
    price: number | any;
    priceoriginal: number;
    variations?: {
        color: string[];
        size: string[];
    }
}
const ProductCard: React.FC<IProductType> = ({ name, variant, id, image_front, image_back, description, available_shades, label }) => {
    let theme = useSelector((state: IState) => state.toggletheme);
    let [hover, setHover] = React.useState<boolean>(false);
    React.useEffect(() => {
        // console.log("HOVER vaLUE", hover);
        // console.log({thumnail,label,image,category,price,priceoriginal,variations});
    }, [hover]);
    return (
        <>
            <Card className={theme.dark ? style.productCard : style.lightcard}>
                <div className={theme.dark ? (!hover ? `cursor-pointer position-relative ${style.imageholderdark}` : `cursor-pointer position-relative ${style.activeHolderdark}`) : (!hover ? `cursor-pointer position-relative ${style.imageholderlight}` : `cursor-pointer position-relative ${style.activeHolderlight}`)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <img className={!hover ? `${style.imageDisplay} w-[90%] h-100` : `${style.imagehide} w-[90%] h-100 mx-auto`} src={image_front} />
                    <img className={hover ? `${style.imageDisplay} w-[90%] h-100` : `${style.imagehide} h-100 w-[90%] mx-auto`} src={image_back} />
                </div>
                <div className={style.cardfooter}>
                    <Typography className="" color={theme.light ? "#000" : "#9ca3af"} variant={"subtitle1"}>
                        {"Tshirt"}
                    </Typography>
                    <Typography className={style.labeltext} color={theme.light ? "#000" : "#fff"} fontWeight={"bold"} variant={"subtitle1"}>
                        {name}
                    </Typography>
                    <div className="d-flex align-items-center justify-between">
                        {/* variations  are commented for the time being */}
                        <div className="color-variants flex align-center ">
                            {available_shades?.split(",")?.map((color, index) =>
                                // <>
                                // <span key={index} style={{ backgroundColor: color }} className={`${style.colordot}`}>
                                //     {color}
                                // </span>
                                // </>
                                <>
                                    {ColorLabel({ hexcode: color })}
                                </>
                            )}
                        </div>
                        <div className="price-section d-flex align-items-center gap-2">
                            <Typography color={theme.light ? "#000" : "gray"} className="text-decoration-line-through d-flex align-items-center" variant={"subtitle1"}>
                                <span className="h-fit">
                                    <FaRupeeSign size={15} />
                                </span>
                                {1100}
                            </Typography>
                            {/* - */}
                            <Typography color={theme.light ? "#000" : "#fff"} className="d-flex align-items-center" variant="subtitle1">
                                <span className="h-fit">
                                    <FaRupeeSign size={15} color={theme.light ? "#0000" : "#fff"} />
                                </span>
                                {100}
                            </Typography>
                        </div>
                    </div>
                    {/* till for the time being no needed to print this */}
                    <div className="available-sizes flex align-center justify-center gap-1 w-100">
                        {variant?.split("|").map((size, index) => <span className={theme.light ? `border border-muted border-2 p-1 text-dark text-uppercase fs-6` : `border border-2 border-light p-1 text-light text-uppercase fs-6`}>{size}</span>)}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default ProductCard;
