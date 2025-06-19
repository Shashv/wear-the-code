import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "@/components/productcard";
import Link from "next/link";
import { FormatisedList } from "@/modals";
const ProductGrid: React.FC<{ zippersSchema: FormatisedList }> = ({ zippersSchema }) => {
    return (
        <>
            <Grid container rowGap={2.4} className="justify-center" columnGap={1.4}>
                {Object.keys(zippersSchema || {}).length > 0 ? (
                    Object.entries(zippersSchema).map(([zipper, product]) => (
                        <Grid item xs={5.7} sm={5.9} md={2.3} key={zipper}>
                            <Link href={`/product/${product.slug}`}>
                                <ProductCard {...product} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} className="justify-center flex">
                        <Typography variant="h4" color="magenta">
                            Sorry, product out of stock
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    )
}
export default ProductGrid;