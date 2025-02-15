import React from "react";
// import COLLECTIONS from "@/utils/collections";
// import { Card, CardBody, CardImg, CardImgOverlay } from "react-bootstrap";
import { ICollectionCard } from "@/modals";
import style from "./index.module.css";
// import { Typography } from "@mui/material";
// import { useInView } from "react-intersection-observer";
// import { useContext } from "react";
// import { ContextObject } from "@/utils/context";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css"
const CollectionCard: React.FC<ICollectionCard> = ({ collectionName, thumbnail }) => {
    // ...use component bases aos..//
    // let value = useContext(ContextObject);
    useEffect(() => {
        Aos.init({
            once:false
        });
    });
    return (
        <>
            <div className={`border card border-none rounded-2 shadow-sm position-relative`}>
                <div className="card-img-top w-100 h-100 flex justify-center">
                    <img className={`h-100 w-100 ${style.cardimage}`} src={thumbnail} />
                </div>
            </div>
        </>
    )
}
export default CollectionCard;