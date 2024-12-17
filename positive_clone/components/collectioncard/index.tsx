import React from "react";
import COLLECTIONS from "@/utils/collections";
import { Card, CardBody, CardImg, CardImgOverlay } from "react-bootstrap";
import { ICollectionCard } from "@/modals";
import style from "./index.module.css";
import { Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useContext } from "react";
import { ContextObject } from "@/utils/context";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css"
const CollectionCard: React.FC<ICollectionCard> = ({ collectionName, thumbnail }) => {
    let value = useContext(ContextObject);
  
    useEffect(() => {
        Aos.init({
            duration: 200
        });
    }, [])

    return (
        <>
            <Card data-aos={"zoom-in-up"} data-aos-duration={"400"} className={`border border-none rounded-2 shadow-sm position-relative `}>
                <div className="card-img-top w-100 h-100 flex justify-center">
                    <img className={`h-100 w-100 ${style.cardimage}`} src={thumbnail} />
                </div>
            </Card>
        </>
    )
}
export default CollectionCard;