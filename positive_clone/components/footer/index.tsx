import Image from "next/image";
import React from "react";
import { Col, Row } from "reactstrap";
import styles from "./footer.module.css";
import { List, ListItem, Typography } from "@mui/material";
import { useState } from 'react';
import { useSelector } from "react-redux";
import Link from "next/link";
import { IState } from "@/pages/redux/sore";
const Footer: React.FC = () => {
    let theme: { light: boolean; dark: boolean } = useSelector((state: IState) => state.toggletheme);
    let [footerList, setFooterList] = useState([{
        shop: [{ value: "TShirts", route: "tShirts" }, { value: "SweatShirts", route: "sweatShirts" }, { value: "Hoodies", route: "hoodies" }, { value: "Zipper Hodies", route: "zipperHoddies" }, { value: "Mugs", route: "mugs" }],
        customerService: [{ value: "Contact Us", route: "contactUs" }, { value: "About Us", route: "aboutUs" }, { value: "Return Policy", route: "returnPolicy" }, { value: "Shipping Policy", route: "shippingPolicy" }],
        policy: [{ value: "Privacy Policy", route: "privacyPolicy" }, { value: "Terms and Conditions", route: "termsandConditions" }]
    }]);
    return (
        <>
            <footer className={theme.dark ? `${styles.footerdark} p-2 py-5` : `${styles.footer} p-2 py-5`}>
                <Row className="gy-5 justify-center">
                    <Col xs={12} md={2} className="flex flex-column align-items-center gap-2 justify-center">
                        <Image src={"https://codeswear.com/logo.png"} width={200} height={200} className="rounded-circle" alt="Brand" />
                        <Typography color={theme.light ? "#000" : "#9ca3a4"} className={theme.light ? "text-center w-1/2" : "text-center w-1/2"}>
                            Wear the &lt;code/&gt;
                            <br />
                            Premuim coding tshirts,
                            hoodies and apparals
                        </Typography>
                    </Col>
                    <Col xs={12} md={2} className="text-light d-flex flex-column gap-2">
                        <Typography sx={{ fontSize: { xs: 17 } }} className={theme.light ? "text-gray-600 text-center" : "text-light text-center"}>
                            Shop
                        </Typography>
                        <div className="d-flex flex-column">
                            <List dense disablePadding className="" key={""}>
                                {footerList[0].shop.map((key, index) =>
                                    <ListItem sx={{ fontSize: "14px" }} key={index} className="px-0 justify-center hover:text-pink-400">
                                        <Link href={`/${key.route}`} className={theme.light ? "text-decoration-none  hover:text-pink-400" : "text-decoration-none text-light hover:text-pink-400"}>
                                            {key.value.toUpperCase()}
                                        </Link>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </Col>
                    <Col xs={12} md={2} className="d-flex flex-column gap-2">
                        <Typography sx={{ fontSize: { xs: 17 } }} className={theme.light ? "text-gray-600 text-center" : "text-light text-center"}>
                            Customer Service
                        </Typography>
                        <div className="d-flex flex-column">
                            <List dense disablePadding>
                                {footerList[0].customerService.map((key, index) =>
                                    <ListItem sx={{ fontSize: "15px" }} key={index} className="px-0 justify-center hover:text-pink">
                                        <Link href={`/${key.route}`} className={theme.light ? "text-decoration-none text-muted cursor-pointer" : "text-light cursor-pointer text-decoration-none"}>
                                            {key.value}
                                        </Link>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </Col>
                    <Col xs={12} md={2} className="flex flex-col gap-2">
                        <Typography className={theme.light ? "text-gray-600 text-center" : "text-light text-center"} sx={{ fontSize: { xs: 17 } }}>
                            Privacy Policy
                        </Typography>
                        <List dense disablePadding>
                            {footerList[0].policy.map((key, index) =>
                                <ListItem sx={{ fontSize: "15px" }} key={index} className={theme.light ? "text-gray-600 justify-center hover:text-pink-400" : "hover:text-pink-400 text-light justify-center"}>
                                    <Link className="" href={`/${key.route}`}>
                                        {key.value}
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                    </Col>
                    <Col xs={12} md={2} className="text-light fw-bold my-auto fs-4">
                        <div className="">
                            <img className="" src="	https://codeswear.com/pay.png" />
                        </div>
                    </Col>
                </Row>
            </footer>
        </>
    )
}
export default Footer;