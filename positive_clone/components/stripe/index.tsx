import React from 'react';
import { Button } from "@mui/material";
type IGooglepayprops = {
    environment?: string;
    merchantId?: string;
    merchantKey?: string;
    onPaymentprocess: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const GooglePay: React.FC<IGooglepayprops> = ({ environment, merchantId, merchantKey, onPaymentprocess }) => {
    return (
        <>
            <Button className='' variant={"outlined"} color="secondary" onClick={onPaymentprocess}>
                Pay using the stripe
            </Button>
        </>
    )
}
export default GooglePay;