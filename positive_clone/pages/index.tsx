import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.css";
import { GetServerSideProps } from "next";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Loader from "@/components/loader";
import CollectionSections from "@/sections/collections";
import { IState } from "./redux/sore";
import ThemeSection from "@/sections/themes";
import TagSection from "@/sections/tagssection";
import BestSelling from "@/sections/bestsale";
import { useEffect } from "react";
import { ContextObject } from "@/utils/context";
import { headers } from "next/headers";
interface IParas {
    props: {
        name: string
    }
}

export default function Home(props: { name: string, scrollTop: number, direction: string } | any) {
    const rouerDetail = useRouter();
    let scrollDIrection: string = "";
    let [scrollDirection, setScrollDirection] = useState<string>("");
    let theme = useSelector((state: IState) => state.toggletheme);

    useEffect(() => {
        props.scrollTop > 0 ? setScrollDirection("down") : setScrollDirection("up");
    }, []);
    return (
        <ContextObject.Provider value={props.direction}>
            <div className={theme.light ? "wrapper bg-white" : "wrapper bg-dark"}>
                <div className={style.customcontainer}>
                    <div className={style.wrapper}>
                        <img className={style.imgfirst} src="/home.jpg" />
                        <img className={style.imgthird} src="/onlinefirst.jpg" />
                        <img className={style.imgfourth} src="/onlinesecond.jpg" />
                        <img className={style.imgfifth} src="/onlinethird.jpg" />
                        <img className={style.imgsixth} src="/onlinefourth.jpg" />
                    </div>
                </div>
                <div className={theme.light ? "collections-container bg-light" : "collections-container"} style={{ backgroundColor: `${theme.dark && "#1f2937"}` }}>
                    <CollectionSections theme={theme} />
                </div>
                <div className={theme.light ? "theme-sections bg-white" : "theme-sections bg-dark"}>
                    <ThemeSection theme={theme} />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "" }} className={theme.dark ? "best-selling px-5" : "best-selling-light bg-white px-5"}>
                    <BestSelling />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "#fff" }}>
                    <TagSection theme={theme} />
                </div>
            </div>
        </ContextObject.Provider>
    );
}
