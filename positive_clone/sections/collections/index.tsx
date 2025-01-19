import React, { useEffect } from "react";
import COLLECTIONS from "@/utils/collections";
import Box from "@mui/material/Box";
import CollectionCard from "@/components/collectioncard";
import { Typography } from "@mui/material";
import { useContext } from "react";
const CollectionSections: React.FC<{ theme: { light: boolean; dark: boolean } }> = ({ theme }) => {
    return (
        <>
            <div className={"container-fluid"}>
                <div className={`p-4 text-center`}>
                    <Typography className={theme.dark ? "text-light" : "text-dark"} variant="h4" fontWeight={"bold"}>
                        COLECTIONS
                    </Typography>
                </div>
                <div className="row g-5 d px-5">
                    {COLLECTIONS.map((key, index) => <div className="col-md-6 col-lg-4 col-sm-12" key={index}> <CollectionCard collectionName={key.collectionName} thumbnail={key.thumbnail} /> </div>)}
                </div>
            </div>
        </>
    )
}
export default CollectionSections;